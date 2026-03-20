#!/usr/bin/env python3
"""
Advanced Image Converter & Optimizer v2.0
=========================================
Converts images to WebP (or other formats) with smart compression.
Supports PNG, JPG, JPEG, BMP, TIFF, GIF, SVG, ICO, WEBP and more.

SVG Handling:
  - Detects embedded raster data in SVGs and extracts it directly
  - Renders pure-vector SVGs via svglib (if available)
  - Option to keep small SVGs as-is

Features:
  - Interactive mode with guided prompts
  - CLI mode with full argparse support
  - Smart auto-quality to hit target folder size
  - Resize, lossless, alpha quality controls
  - Dry run, backup, replace-in-place modes
  - Progress bar and detailed size reports

Usage:
  python img_converter.py                              Interactive mode
  python img_converter.py -i ./images -q 75            CLI mode
  python img_converter.py -i ./images --target-size 1.5  Auto quality
"""

import os
import sys
import io
import re
import base64
import shutil
import argparse
import time
import tempfile
import subprocess
import math
import xml.etree.ElementTree as ET
from pathlib import Path
from datetime import datetime

try:
    from PIL import Image
    Image.MAX_IMAGE_PIXELS = None
except ImportError:
    print("\n  ERROR: Pillow is required.\n  Install:  pip install Pillow\n")
    sys.exit(1)

# Optional: svglib for pure-vector SVGs
try:
    from svglib.svglib import svg2rlg
    from reportlab.graphics import renderPM
    HAS_SVGLIB = True
except (ImportError, OSError):
    HAS_SVGLIB = False

# ---------------------------------------------------------------------------
RASTER_EXTS = {'.png', '.jpg', '.jpeg', '.bmp', '.tiff', '.tif', '.gif',
               '.ico', '.webp', '.ppm', '.pgm', '.pbm'}
VECTOR_EXTS = {'.svg'}
ALL_EXTS = RASTER_EXTS | VECTOR_EXTS
FORMAT_CHOICES = ('webp', 'png', 'jpeg', 'avif')

# ---------------------------------------------------------------------------
#  Terminal colours
# ---------------------------------------------------------------------------
class C:
    H  = '\033[95m'
    B  = '\033[94m'
    CY = '\033[96m'
    G  = '\033[92m'
    W  = '\033[93m'
    R  = '\033[91m'
    BD = '\033[1m'
    DM = '\033[2m'
    RS = '\033[0m'

def _enable_vt():
    if sys.platform == 'win32':
        try:
            import ctypes
            k = ctypes.windll.kernel32
            h = k.GetStdHandle(-11)
            m = ctypes.c_ulong()
            k.GetConsoleMode(h, ctypes.byref(m))
            k.SetConsoleMode(h, m.value | 0x0004)
        except Exception:
            pass

_enable_vt()

# ---------------------------------------------------------------------------
#  Helpers
# ---------------------------------------------------------------------------
def fmt_size(b):
    if b < 1024:
        return f"{b} B"
    if b < 1024 ** 2:
        return f"{b / 1024:.2f} KB"
    return f"{b / (1024 ** 2):.2f} MB"

def get_image_files(folder, exts=None):
    exts = exts or ALL_EXTS
    out = []
    for root, _, files in os.walk(folder):
        for fn in files:
            if Path(fn).suffix.lower() in exts:
                out.append(os.path.join(root, fn))
    return sorted(out)

def bar(cur, total, w=30):
    f = int(w * cur / total) if total else 0
    return '█' * f + '░' * (w - f)

# ---------------------------------------------------------------------------
#  SVG -> PIL  (extract embedded raster OR render via svglib)
# ---------------------------------------------------------------------------
_B64_RE = re.compile(
    r'data:image/([a-zA-Z0-9+]+);base64,([A-Za-z0-9+/=\s]+)',
    re.DOTALL)

def _extract_embedded_raster(svg_path):
    """
    Parse an SVG and extract embedded base64 raster images.
    Returns a list of PIL Images or empty list.
    """
    try:
        with open(svg_path, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
    except Exception:
        return []

    images = []
    for m in _B64_RE.finditer(content):
        b64_data = m.group(2).replace('\n', '').replace('\r', '').replace(' ', '')
        try:
            raw = base64.b64decode(b64_data)
            pil = Image.open(io.BytesIO(raw))
            pil.load()
            images.append(pil)
        except Exception:
            continue
    return images

def _render_svg_svglib(svg_path, scale=1.0):
    """Render SVG to PIL Image using svglib+reportlab (pure Python)."""
    if not HAS_SVGLIB:
        return None
    try:
        drawing = svg2rlg(svg_path)
        if drawing is None:
            return None
        if scale != 1.0:
            drawing.width *= scale
            drawing.height *= scale
            drawing.scale(scale, scale)
        buf = io.BytesIO()
        renderPM.drawToFile(drawing, buf, fmt='PNG')
        buf.seek(0)
        img = Image.open(buf)
        img.load()
        return img
    except Exception:
        return None


def _parse_svg_size(svg_path):
    """Parse SVG width/height for browser viewport sizing."""
    def _to_px(v):
        if not v:
            return None
        s = str(v).strip().lower()
        m = re.match(r'^([0-9]+(?:\.[0-9]+)?)(px)?$', s)
        if m:
            return float(m.group(1))
        return None

    try:
        root = ET.parse(svg_path).getroot()
    except Exception:
        return 1024, 1024

    w = _to_px(root.attrib.get('width'))
    h = _to_px(root.attrib.get('height'))

    if (not w or not h) and 'viewBox' in root.attrib:
        parts = root.attrib['viewBox'].replace(',', ' ').split()
        if len(parts) == 4:
            try:
                vbw = float(parts[2])
                vbh = float(parts[3])
                if not w:
                    w = vbw
                if not h:
                    h = vbh
            except (ValueError, TypeError):
                pass

    w = int(max(1, min(8192, math.ceil(w or 1024))))
    h = int(max(1, min(8192, math.ceil(h or 1024))))
    return w, h


def _find_browser_for_svg_render():
    """Find a Chromium browser path for headless SVG rendering on Windows."""
    if sys.platform != 'win32':
        return None
    candidates = [
        r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
        r'C:\Program Files\Microsoft\Edge\Application\msedge.exe',
        r'C:\Program Files\Google\Chrome\Application\chrome.exe',
        r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe',
    ]
    for p in candidates:
        if os.path.exists(p):
            return p
    return None


def _render_svg_browser(svg_path):
    """Render SVG using headless Edge/Chrome for pixel-accurate output."""
    browser = _find_browser_for_svg_render()
    if not browser:
        return None

    w, h = _parse_svg_size(svg_path)
    tmp = tempfile.NamedTemporaryFile(suffix='.png', delete=False)
    tmp_path = tmp.name
    tmp.close()

    uri = Path(svg_path).resolve().as_uri()
    cmd = [
        browser,
        '--headless',
        '--disable-gpu',
        '--hide-scrollbars',
        '--force-device-scale-factor=1',
        f'--window-size={w},{h}',
        f'--screenshot={tmp_path}',
        uri,
    ]

    try:
        subprocess.run(cmd, check=False,
                       stdout=subprocess.DEVNULL,
                       stderr=subprocess.DEVNULL,
                       timeout=20)
        if not os.path.exists(tmp_path) or os.path.getsize(tmp_path) == 0:
            return None
        img = Image.open(tmp_path)
        img.load()
        return img
    except Exception:
        return None
    finally:
        try:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)
        except OSError:
            pass

def _is_misnamed_raster(svg_path):
    """Check if a .svg file is actually a raster image (e.g. PNG with wrong extension)."""
    try:
        with open(svg_path, 'rb') as f:
            header = f.read(16)
        # PNG, JPEG, GIF, BMP, WebP, TIFF signatures
        sigs = [b'\x89PNG', b'\xff\xd8\xff', b'GIF8', b'BM',
                b'RIFF', b'II\x2a\x00', b'MM\x00\x2a']
        for sig in sigs:
            if header.startswith(sig):
                return True
        if len(header) >= 12 and header[8:12] == b'WEBP':
            return True
        return False
    except Exception:
        return False

def svg_to_pil(svg_path, scale=1.0):
    """
    Best-effort SVG -> PIL:
      0. Detect misnamed raster files (.svg that is actually PNG/JPEG/etc).
      1. Extract embedded raster images (works perfectly for SVGs that are
         just wrappers around base64 PNGs/JPEGs).
      2. Fall back to svglib rendering for vector-only SVGs.

    Returns (PIL.Image | None, error_str | None).
    """
    # --- strategy 0: misnamed raster file ---
    if _is_misnamed_raster(svg_path):
        try:
            img = Image.open(svg_path)
            img.load()
            return img, None
        except Exception as e:
            return None, f"misnamed raster open failed: {e}"

    # --- strategy 1: browser render (exact composition) ---
    img = _render_svg_browser(svg_path)
    if img is not None:
        return img, None

    # --- strategy 2: extract embedded raster ---
    rasters = _extract_embedded_raster(svg_path)
    if rasters:
        # pick largest by pixel count
        best = max(rasters, key=lambda im: im.width * im.height)
        return best, None

    # --- strategy 3: render via svglib ---
    img = _render_svg_svglib(svg_path, scale)
    if img is not None:
        # check it's not essentially blank
        if img.width > 1 and img.height > 1:
            return img, None

    return None, "No raster data & svglib unavailable/failed"

# ---------------------------------------------------------------------------
#  Core conversion
# ---------------------------------------------------------------------------
def convert_one(src, dst, fmt='webp', quality=75, lossless=False,
                method=4, alpha_quality=100, resize_max=None,
                svg_scale=1.0, strip_metadata=True):
    ext = Path(src).suffix.lower()

    try:
        if ext == '.svg':
            img, err = svg_to_pil(src, svg_scale)
            if img is None:
                return None, err or "SVG conversion failed"
        else:
            img = Image.open(src)
            img.load()
    except Exception as e:
        return None, f"open: {e}"

    try:
        # mode fixes
        if img.mode == 'P':
            img = img.convert('RGBA')
        elif img.mode == 'CMYK':
            img = img.convert('RGB')
        elif img.mode in ('1', 'I'):
            img = img.convert('L')
        elif img.mode == 'LA':
            img = img.convert('RGBA')

        # resize
        if resize_max and (img.width > resize_max or img.height > resize_max):
            r = min(resize_max / img.width, resize_max / img.height)
            img = img.resize((max(1, int(img.width * r)),
                              max(1, int(img.height * r))),
                             Image.Resampling.LANCZOS)

        # flatten alpha for JPEG
        if fmt == 'jpeg' and img.mode in ('RGBA', 'LA', 'PA'):
            bg = Image.new('RGB', img.size, (255, 255, 255))
            bg.paste(img, mask=img.split()[-1])
            img = bg
        elif fmt == 'jpeg' and img.mode not in ('RGB', 'L'):
            img = img.convert('RGB')

        # save kwargs
        kw = {}
        if fmt == 'webp':
            kw = dict(quality=quality, lossless=lossless,
                      method=method, alpha_quality=alpha_quality)
        elif fmt == 'jpeg':
            kw = dict(quality=quality, optimize=True, subsampling='4:2:0')
        elif fmt == 'png':
            kw = dict(optimize=True)
        elif fmt == 'avif':
            kw = dict(quality=quality)

        os.makedirs(os.path.dirname(dst), exist_ok=True)

        # atomic-ish write via temp file
        tmp_fd, tmp_path = tempfile.mkstemp(suffix=f'.{fmt}',
                                            dir=os.path.dirname(dst))
        os.close(tmp_fd)
        try:
            img.save(tmp_path, format=fmt.upper(), **kw)
            if os.path.exists(dst):
                os.remove(dst)
            os.rename(tmp_path, dst)
        except Exception:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)
            raise

        return os.path.getsize(dst), None
    except Exception as e:
        return None, f"convert: {e}"
    finally:
        img.close()

# ---------------------------------------------------------------------------
#  Batch
# ---------------------------------------------------------------------------
def process_batch(images, in_folder, out_folder, fmt, quality,
                  lossless, method, alpha_quality, resize_max,
                  svg_scale, strip_metadata, skip_small_svg,
                  small_svg_threshold):
    stats = dict(ok=0, skip=0, err=0, svg_kept=0,
                 orig_bytes=0, new_bytes=0, elapsed=0.0)
    results = []
    t0 = time.time()
    total = len(images)

    for i, src in enumerate(images, 1):
        rel = os.path.relpath(src, in_folder)
        ext = Path(src).suffix.lower()
        orig_sz = os.path.getsize(src)

        pct = i / total * 100
        tag = f"  [{bar(i, total)}] {pct:5.1f}%  "
        print(f"{tag}{C.DM}{rel}{C.RS}", end='', flush=True)

        # optionally keep small SVGs as-is
        if ext == '.svg' and skip_small_svg and orig_sz < small_svg_threshold:
            dst = os.path.join(out_folder, rel)
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            if os.path.abspath(src) != os.path.abspath(dst):
                shutil.copy2(src, dst)
            print(f"  {C.CY}[KEPT SVG {fmt_size(orig_sz)}]{C.RS}")
            stats['svg_kept'] += 1
            stats['orig_bytes'] += orig_sz
            stats['new_bytes'] += orig_sz
            continue

        # output path
        out_name = Path(rel).stem + '.' + fmt
        out_rel = os.path.join(os.path.dirname(rel), out_name)
        dst = os.path.join(out_folder, out_rel)

        new_sz, err = convert_one(
            src, dst, fmt, quality, lossless, method,
            alpha_quality, resize_max, svg_scale, strip_metadata)

        if err:
            print(f"  {C.R}[ERR {err}]{C.RS}")
            stats['err'] += 1
            # copy original if conversion failed
            fallback_dst = os.path.join(out_folder, rel)
            os.makedirs(os.path.dirname(fallback_dst), exist_ok=True)
            if os.path.abspath(src) != os.path.abspath(fallback_dst):
                shutil.copy2(src, fallback_dst)
            stats['orig_bytes'] += orig_sz
            stats['new_bytes'] += orig_sz
        else:
            saving = (orig_sz - new_sz) / orig_sz * 100 if orig_sz else 0
            clr = C.G if saving >= 0 else C.R
            print(f"  {clr}{fmt_size(orig_sz)} -> {fmt_size(new_sz)}  "
                  f"({saving:+.1f}%){C.RS}")
            stats['ok'] += 1
            stats['orig_bytes'] += orig_sz
            stats['new_bytes'] += new_sz
            results.append(dict(file=rel, orig=orig_sz,
                                new=new_sz, saving=saving))

    stats['elapsed'] = time.time() - t0
    return results, stats


def print_report(results, stats):
    sep = '=' * 58
    print(f"\n  {C.BD}{sep}{C.RS}")
    print(f"  {C.BD}  CONVERSION REPORT{C.RS}")
    print(f"  {sep}")
    print(f"    Converted : {stats['ok']} files")
    if stats['svg_kept']:
        print(f"    SVGs kept : {stats['svg_kept']} files")
    if stats['skip']:
        print(f"    Skipped   : {stats['skip']} files")
    if stats['err']:
        print(f"    Errors    : {stats['err']} files")
    print(f"    Time      : {stats['elapsed']:.2f}s")
    print()
    if stats['orig_bytes']:
        saved = stats['orig_bytes'] - stats['new_bytes']
        pct = saved / stats['orig_bytes'] * 100
        print(f"    Before    : {fmt_size(stats['orig_bytes'])}")
        print(f"    After     : {fmt_size(stats['new_bytes'])}")
        color = C.G if saved > 0 else C.R
        print(f"    Saved     : {color}{fmt_size(abs(saved))}  "
              f"({pct:.1f}%){C.RS}")
    print(f"  {sep}")

    if results:
        results.sort(key=lambda r: r['orig'] - r['new'], reverse=True)
        print(f"\n  {C.BD}  TOP SAVINGS:{C.RS}")
        for r in results[:7]:
            s = r['orig'] - r['new']
            print(f"    - {r['file']}:  {fmt_size(s)} saved  ({r['saving']:.1f}%)")
    print()

# ---------------------------------------------------------------------------
#  Auto-quality: binary search
# ---------------------------------------------------------------------------
def auto_quality_search(images, in_folder, fmt, target_mb,
                        min_q, max_q, lossless, method,
                        alpha_quality, resize_max, svg_scale,
                        strip_metadata, skip_small_svg,
                        small_svg_threshold):

    target_bytes = target_mb * 1024 * 1024

    # size of SVGs that will be kept as-is
    kept_bytes = 0
    convertible = []
    for f in images:
        ext = Path(f).suffix.lower()
        sz = os.path.getsize(f)
        if ext == '.svg' and skip_small_svg and sz < small_svg_threshold:
            kept_bytes += sz
        else:
            convertible.append(f)

    effective_target = target_bytes - kept_bytes
    if effective_target <= 0:
        print(f"  {C.W}Kept SVGs already exceed target.{C.RS}")
        return max_q

    # sample biggest files
    samples = sorted(convertible,
                     key=lambda f: os.path.getsize(f), reverse=True)
    samples = samples[:min(8, len(samples))]
    sample_orig = sum(os.path.getsize(f) for f in samples)
    total_orig = sum(os.path.getsize(f) for f in convertible)

    if total_orig == 0:
        return max_q

    lo, hi = min_q, max_q
    best_q = max_q

    print(f"\n  {C.CY}Auto-quality search  "
          f"(target {target_mb:.1f} MB, range Q{lo}-Q{hi}){C.RS}")
    print(f"  Sampling {len(samples)} largest files ...\n")

    while lo <= hi:
        mid = (lo + hi) // 2
        sample_new = 0
        for src in samples:
            try:
                ext = Path(src).suffix.lower()
                if ext == '.svg':
                    img, err = svg_to_pil(src, svg_scale)
                    if img is None:
                        continue
                else:
                    img = Image.open(src)
                    img.load()

                if img.mode == 'P':
                    img = img.convert('RGBA')
                elif img.mode == 'CMYK':
                    img = img.convert('RGB')
                elif img.mode in ('1', 'I'):
                    img = img.convert('L')
                elif img.mode == 'LA':
                    img = img.convert('RGBA')

                if resize_max and (img.width > resize_max or
                                   img.height > resize_max):
                    r = min(resize_max / img.width, resize_max / img.height)
                    img = img.resize((max(1, int(img.width * r)),
                                      max(1, int(img.height * r))),
                                     Image.Resampling.LANCZOS)

                if fmt == 'jpeg' and img.mode in ('RGBA', 'LA', 'PA'):
                    bg = Image.new('RGB', img.size, (255, 255, 255))
                    bg.paste(img, mask=img.split()[-1])
                    img = bg
                elif fmt == 'jpeg' and img.mode not in ('RGB', 'L'):
                    img = img.convert('RGB')

                buf = io.BytesIO()
                kw = {}
                if fmt == 'webp':
                    kw = dict(quality=mid, lossless=lossless,
                              method=method, alpha_quality=alpha_quality)
                elif fmt == 'jpeg':
                    kw = dict(quality=mid, optimize=True)
                elif fmt == 'avif':
                    kw = dict(quality=mid)
                img.save(buf, format=fmt.upper(), **kw)
                sample_new += buf.tell()
                img.close()
            except Exception:
                continue

        if sample_orig > 0 and sample_new > 0:
            ratio = sample_new / sample_orig
            est = total_orig * ratio + kept_bytes
        else:
            est = total_orig + kept_bytes

        ok = est <= target_bytes
        s = C.G + "FITS" if ok else C.R + "TOO BIG"
        print(f"    Q={mid:3d}  ->  est. {fmt_size(int(est))}  [{s}{C.RS}]")

        if ok:
            best_q = mid
            lo = mid + 1
        else:
            hi = mid - 1

    print(f"\n  {C.G}Selected quality: {best_q}{C.RS}\n")
    return best_q

# ---------------------------------------------------------------------------
#  Interactive
# ---------------------------------------------------------------------------
def ask(prompt, default=None, validate=None, cast=None):
    while True:
        suf = f" [{default}]" if default is not None else ""
        raw = input(f"  {C.CY}{prompt}{suf}: {C.RS}").strip()
        if not raw and default is not None:
            raw = str(default)
        if cast:
            try:
                raw = cast(raw)
            except (ValueError, TypeError):
                print(f"    {C.R}Invalid value.{C.RS}")
                continue
        if validate and not validate(raw):
            print(f"    {C.R}Invalid value.{C.RS}")
            continue
        return raw


def interactive():
    print_banner()

    # --- folder ---
    while True:
        folder = input(f"\n  {C.CY}Enter folder path containing images: {C.RS}"
                       ).strip().strip('"').strip("'")
        if os.path.isdir(folder):
            break
        print(f"    {C.R}Folder not found.{C.RS}")

    images = get_image_files(folder)
    svg_n = sum(1 for f in images if Path(f).suffix.lower() == '.svg')
    raster_n = len(images) - svg_n
    total_sz = sum(os.path.getsize(f) for f in images)

    print(f"\n  {C.G}Scan Results:{C.RS}")
    print(f"    Total images  : {len(images)}")
    print(f"    Raster images : {raster_n}")
    print(f"    SVG images    : {svg_n}")
    print(f"    Total size    : {fmt_size(total_sz)}")
    if not images:
        print(f"\n  {C.R}No images found.{C.RS}")
        return

    # --- format ---
    print(f"\n  {C.CY}Output format:{C.RS}")
    print("    1. WebP  (recommended - best compression)")
    print("    2. PNG   (lossless, larger)")
    print("    3. JPEG  (lossy, no transparency)")
    print("    4. AVIF  (modern, excellent quality/size)")
    fmap = {'1': 'webp', '2': 'png', '3': 'jpeg', '4': 'avif'}
    fc = ask("Choose [1-4]", '1', lambda v: v in fmap)
    fmt = fmap[fc]

    # --- quality ---
    print(f"\n  {C.CY}Quality guide:{C.RS}")
    print("    60-70  : Aggressive, acceptable quality")
    print("    70-80  : Balanced  (recommended)")
    print("    80-90  : High quality")
    print("    90-100 : Near lossless")
    quality = ask("Quality", 75, lambda v: 1 <= v <= 100, int)

    # --- lossless ---
    lossless = False
    if fmt == 'webp':
        ll = ask("Lossless compression? [y/N]", 'N')
        lossless = ll.lower() in ('y', 'yes')

    # --- method ---
    method = 4
    if fmt == 'webp':
        print(f"\n  {C.CY}Compression method:{C.RS}")
        print("    0 = Fastest    4 = Balanced (default)    6 = Best")
        method = ask("Method [0-6]", 4, lambda v: 0 <= v <= 6, int)

    # --- alpha quality ---
    alpha_quality = 100
    if fmt == 'webp':
        alpha_quality = ask("Alpha channel quality [0-100]", 100,
                            lambda v: 0 <= v <= 100, int)

    # --- resize ---
    print(f"\n  {C.CY}Resize: max width/height (px). Enter to skip.{C.RS}")
    r = input(f"  {C.CY}Max dimension: {C.RS}").strip()
    resize_max = int(r) if r.isdigit() and int(r) > 0 else None

    # --- SVG settings ---
    svg_scale = 1.0
    skip_small_svg = False
    small_svg_threshold = 50 * 1024

    if svg_n > 0:
        print(f"\n  {C.CY}SVG settings:{C.RS}")
        ss = ask("Keep small SVGs as-is (icons, logos)? [Y/n]", 'Y')
        skip_small_svg = ss.lower() not in ('n', 'no')
        if skip_small_svg:
            t = ask("Max SVG size to keep as-is (KB)", 50,
                    lambda v: 1 <= v <= 10000, int)
            small_svg_threshold = t * 1024

        sc = ask("SVG render scale (for large SVGs)", 1.0,
                 lambda v: 0.1 <= v <= 5.0, float)
        svg_scale = sc

    # --- target size ---
    print(f"\n  {C.CY}Target folder size (optional, auto-adjusts quality):{C.RS}")
    print("    Press Enter to skip.")
    ts = input(f"  {C.CY}Target size in MB: {C.RS}").strip()
    target_mb = float(ts) if ts else None
    min_quality = 30
    if target_mb:
        min_quality = ask("Minimum quality floor", 30,
                          lambda v: 1 <= v <= quality, int)

    # --- strip metadata ---
    sm = ask("Strip EXIF metadata? [Y/n]", 'Y')
    strip_meta = sm.lower() not in ('n', 'no')

    # --- output mode ---
    print(f"\n  {C.CY}Output mode:{C.RS}")
    print("    1. Save to new folder (safe)")
    print("    2. Replace originals")
    om = ask("Choose [1-2]", '1', lambda v: v in ('1', '2'))

    if om == '2':
        out_folder = folder
        bk = ask(f"{C.W}Create backup first? [Y/n]{C.RS}", 'Y')
        if bk.lower() not in ('n', 'no'):
            bp = f"{folder}_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            print(f"    Backing up to {bp} ...")
            shutil.copytree(folder, bp)
            print(f"    {C.G}Backup done.{C.RS}")
    else:
        default_out = f"{folder}_optimized"
        out_folder = input(
            f"  {C.CY}Output folder [{default_out}]: {C.RS}"
        ).strip().strip('"') or default_out

    # --- summary ---
    sep = '=' * 55
    print(f"\n  {C.BD}{sep}{C.RS}")
    print(f"  {C.BD}  SETTINGS SUMMARY{C.RS}")
    print(f"  {sep}")
    print(f"    Input       : {folder}")
    print(f"    Output      : {out_folder}")
    print(f"    Format      : {fmt.upper()}")
    print(f"    Quality     : {quality}")
    print(f"    Lossless    : {'Yes' if lossless else 'No'}")
    if fmt == 'webp':
        print(f"    Method      : {method}")
        print(f"    Alpha Q     : {alpha_quality}")
    if resize_max:
        print(f"    Max dim     : {resize_max}px")
    if svg_n:
        print(f"    SVG scale   : {svg_scale}")
        if skip_small_svg:
            print(f"    Keep SVGs < : {small_svg_threshold // 1024} KB")
    if target_mb:
        print(f"    Target size : {target_mb} MB  (min Q={min_quality})")
    print(f"    Strip meta  : {'Yes' if strip_meta else 'No'}")
    print(f"    Files       : {len(images)}")
    print(f"    Orig size   : {fmt_size(total_sz)}")
    print(f"  {sep}")

    go = ask("Start conversion? [Y/n]", 'Y')
    if go.lower() in ('n', 'no'):
        print(f"\n  {C.W}Cancelled.{C.RS}\n")
        return

    # auto quality
    if target_mb:
        quality = auto_quality_search(
            images, folder, fmt, target_mb,
            min_quality, quality, lossless, method,
            alpha_quality, resize_max, svg_scale,
            strip_meta, skip_small_svg, small_svg_threshold)

    print(f"\n  {C.BD}Starting conversion ...{C.RS}\n")
    results, stats = process_batch(
        images, folder, out_folder, fmt, quality,
        lossless, method, alpha_quality, resize_max,
        svg_scale, strip_meta, skip_small_svg, small_svg_threshold)
    print_report(results, stats)

    if om == '2':
        cleanup_originals(images, out_folder, fmt, skip_small_svg,
                          small_svg_threshold)


def cleanup_originals(images, out_folder, fmt, skip_small_svg,
                      small_svg_threshold):
    for src in images:
        ext = Path(src).suffix.lower()
        sz = os.path.getsize(src)
        if ext == '.svg' and skip_small_svg and sz < small_svg_threshold:
            continue
        out_ext = f'.{fmt}'
        if ext != out_ext:
            expected = Path(src).with_suffix(out_ext)
            if expected.exists():
                try:
                    os.remove(src)
                except OSError:
                    pass

# ---------------------------------------------------------------------------
#  CLI
# ---------------------------------------------------------------------------
def cli(args):
    print_banner()

    if not os.path.isdir(args.input):
        print(f"  {C.R}Folder not found: {args.input}{C.RS}")
        sys.exit(1)

    exts = RASTER_EXTS.copy()
    if not args.skip_svg:
        exts |= VECTOR_EXTS
    if args.only_formats:
        only = {('.' + x.strip('.').lower()) for x in args.only_formats.split(',')}
        exts = exts & only

    images = get_image_files(args.input, exts)
    if not images:
        print(f"  {C.R}No images found.{C.RS}")
        sys.exit(1)

    total_sz = sum(os.path.getsize(f) for f in images)

    # output
    if args.replace:
        out_folder = args.input
        if not args.no_backup:
            bp = f"{args.input}_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            print(f"  Backup -> {bp}")
            shutil.copytree(args.input, bp)
    else:
        out_folder = args.output or f"{args.input}_optimized"

    quality = args.quality

    skip_small_svg = not args.convert_all_svg
    small_svg_threshold = args.svg_keep_below * 1024

    # dry run
    if args.dry_run:
        print(f"\n  {C.BD}DRY RUN{C.RS}\n")
        for img in images:
            r = os.path.relpath(img, args.input)
            e = Path(img).suffix.lower()
            sz = os.path.getsize(img)
            tag = ""
            if e == '.svg' and skip_small_svg and sz < small_svg_threshold:
                tag = f"  {C.CY}[keep SVG]{C.RS}"
            print(f"    {r}  ({fmt_size(sz)}){tag}")
        print(f"\n  Total: {len(images)} files, {fmt_size(total_sz)}")
        return

    # auto quality
    if args.target_size:
        quality = auto_quality_search(
            images, args.input, args.format,
            args.target_size, args.min_quality, quality,
            args.lossless, args.method, args.alpha_quality,
            args.resize, args.svg_scale,
            True, skip_small_svg, small_svg_threshold)

    print(f"\n  Input   : {args.input}")
    print(f"  Output  : {out_folder}")
    print(f"  Format  : {args.format.upper()}")
    print(f"  Quality : {quality}")
    print(f"  Files   : {len(images)}")
    print(f"  Size    : {fmt_size(total_sz)}\n")

    results, stats = process_batch(
        images, args.input, out_folder, args.format, quality,
        args.lossless, args.method, args.alpha_quality,
        args.resize, args.svg_scale,
        True, skip_small_svg, small_svg_threshold)
    print_report(results, stats)

    if args.replace:
        cleanup_originals(images, out_folder, args.format,
                          skip_small_svg, small_svg_threshold)

# ---------------------------------------------------------------------------
def print_banner():
    print(f"""
{C.CY}  +---------------------------------------------------------+
  |       Advanced Image Converter & Optimizer  v2.0          |
  +---------------------------------------------------------+{C.RS}""")

# ---------------------------------------------------------------------------
def main():
    p = argparse.ArgumentParser(
        description='Advanced Image Converter & Optimizer',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s                                         Interactive mode
  %(prog)s -i ./images -f webp -q 75               Convert to WebP Q75
  %(prog)s -i ./images -o ./out -q 60              Save to separate folder
  %(prog)s -i ./images --target-size 1.5            Auto quality for 1.5 MB
  %(prog)s -i ./images --lossless                   Lossless WebP
  %(prog)s -i ./images -f jpeg -q 80 -r 1920       JPEG, max 1920px
  %(prog)s -i ./images --dry-run                    Preview without converting
  %(prog)s -i ./images --convert-all-svg            Force convert even tiny SVGs
        """)

    p.add_argument('-i', '--input', help='Input folder path')
    p.add_argument('-o', '--output', help='Output folder')
    p.add_argument('-f', '--format', choices=FORMAT_CHOICES, default='webp',
                   help='Output format (default: webp)')
    p.add_argument('-q', '--quality', type=int, default=75,
                   help='Quality 1-100 (default: 75)')
    p.add_argument('--lossless', action='store_true',
                   help='Lossless compression (WebP)')
    p.add_argument('-m', '--method', type=int, default=4,
                   help='WebP method 0-6 (default: 4)')
    p.add_argument('--alpha-quality', type=int, default=100,
                   help='Alpha quality 0-100 (default: 100)')
    p.add_argument('-r', '--resize', type=int, metavar='PX',
                   help='Max dimension to downscale')
    p.add_argument('--svg-scale', type=float, default=1.0,
                   help='SVG render scale (default: 1.0)')
    p.add_argument('--svg-keep-below', type=int, default=50,
                   help='Keep SVGs smaller than N KB as-is (default: 50)')
    p.add_argument('--convert-all-svg', action='store_true',
                   help='Convert ALL SVGs including tiny icons')
    p.add_argument('--target-size', type=float, metavar='MB',
                   help='Target folder size in MB (auto quality)')
    p.add_argument('--min-quality', type=int, default=30,
                   help='Min quality for auto mode (default: 30)')
    p.add_argument('--replace', action='store_true',
                   help='Replace originals in-place')
    p.add_argument('--no-backup', action='store_true',
                   help='Skip backup with --replace')
    p.add_argument('--dry-run', action='store_true',
                   help='Preview only')
    p.add_argument('--skip-svg', action='store_true',
                   help='Skip all SVG files')
    p.add_argument('--only-formats', metavar='EXT',
                   help='Only process these extensions (comma-sep)')
    p.add_argument('--keep-metadata', action='store_true',
                   help='Keep EXIF metadata')

    args = p.parse_args()
    if args.input:
        cli(args)
    else:
        interactive()


if __name__ == '__main__':
    main()
