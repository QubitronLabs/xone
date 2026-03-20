# XONE Design System

> Complete design system extracted from [364 XONE Project](https://www.figma.com/design/iOAsLMFTsuLNoKiXwo2vhB/364-XONE-Project) Figma file.
> All values are production-ready tokens implemented in `src/styles/design-tokens.css`.
> Zero hardcoded values — every visual property references a CSS variable.

---

## Table of Contents

1. [Colors](#1-colors)
2. [Gradients](#2-gradients)
3. [Typography](#3-typography)
4. [Spacing](#4-spacing)
5. [Borders & Effects](#5-borders--effects)
6. [Layout](#6-layout)
7. [Components](#7-components)
8. [Icons & Assets](#8-icons--assets)
9. [Pages & Routes](#9-pages--routes)

---

## 1. Colors

All color tokens follow the naming convention `--color-system-{name}`.
Every unique Figma color has its own variable — no duplicates merged.

### 1.1 Primary

| Variable                       | HEX       | Usage                          |
| ------------------------------ | --------- | ------------------------------ |
| `--color-system-primary`       | `#7926D7` | Gradient start, primary accent |
| `--color-system-primary-mid`   | `#9849F5` | Gradient mid stop              |
| `--color-system-primary-light` | `#CD61FF` | Gradient end stop              |

### 1.2 Backgrounds

| Variable                        | HEX       | Usage                                     |
| ------------------------------- | --------- | ----------------------------------------- |
| `--color-system-ink`            | `#06060E` | Darkest — badge text on light backgrounds |
| `--color-system-bg`             | `#110F20` | Page background start                     |
| `--color-system-bg-deep`        | `#120F21` | Page background variant                   |
| `--color-system-bg-alt`         | `#130E21` | Page background end                       |
| `--color-system-input`          | `#14111F` | Input fields, balance area inner          |
| `--color-system-deep`           | `#151526` | VIP card start                            |
| `--color-system-deep-alt`       | `#1B1120` | VIP card end                              |
| `--color-system-container`      | `#19162B` | Page container wrapper                    |
| `--color-system-container-deep` | `#1A132C` | Page container variant                    |

### 1.3 Surfaces

| Variable                     | HEX       | Usage                   |
| ---------------------------- | --------- | ----------------------- |
| `--color-system-surface`     | `#1D1C34` | Secondary surface start |
| `--color-system-surface-alt` | `#271C2D` | Secondary surface end   |
| `--color-system-overlay`     | `#1F1F38` | Overlay layer start     |
| `--color-system-overlay-alt` | `#302136` | Overlay layer end       |
| `--color-system-overlay-mid` | `#2F2343` | Chat bonus mid stop     |
| `--color-system-modal-base`  | `#2C2446` | Modal solid base        |
| `--color-system-card`        | `#272746` | Card surface start      |
| `--color-system-card-alt`    | `#392741` | Card surface end        |

### 1.4 Glass

| Variable                   | HEX       | Usage             |
| -------------------------- | --------- | ----------------- |
| `--color-system-glass`     | `#2D2C4A` | Glass panel start |
| `--color-system-glass-alt` | `#422E4B` | Glass panel end   |

### 1.5 Borders

| Variable                       | Value     | Usage                                             |
| ------------------------------ | --------- | ------------------------------------------------- |
| `--color-system-border`        | `#BBACD8` | Primary border (buttons, inputs, modal, hero CTA) |
| `--color-system-border-strong` | `#4C406F` | Avatar frame border                               |
| `--color-system-divider`       | `#302847` | Table dividers, chat avatar borders               |
| `--color-system-stroke`        | `#657099` | VIP card stroke (used at 20% opacity)             |

### 1.6 Text

| Variable                         | HEX       | Usage                                             |
| -------------------------------- | --------- | ------------------------------------------------- |
| `--color-system-white`           | `#FFFFFF` | Headings, active items, primary text              |
| `--color-system-text`            | `#CDC7E9` | Body text (auth pages), secondary content         |
| `--color-system-muted`           | `#988FBE` | Inactive nav, footer links, labels, chat messages |
| `--color-system-subtle`          | `#A69FC8` | Sidebar inactive text                             |
| `--color-system-soft`            | `#B1ABD0` | Stat values, copyright text                       |
| `--color-system-soft-bright`     | `#B9B5D0` | Soft text variant                                 |
| `--color-system-shimmer`         | `#BFB7E4` | Gradient text end stop                            |
| `--color-system-placeholder`     | `#585274` | Input placeholder text                            |
| `--color-system-placeholder-alt` | `#71617A` | Deposit input placeholder                         |
| `--color-system-dim`             | `#6D668C` | Timestamps, disclaimer text                       |
| `--color-system-dim-dark`        | `#696286` | Dim text variant                                  |

### 1.7 Accent & Status

| Variable                          | Value                       | Usage                           |
| --------------------------------- | --------------------------- | ------------------------------- |
| `--color-system-accent-soft`      | `rgba(164, 125, 235, 0.24)` | Icon button bg, secondary fills |
| `--color-system-accent-soft-deep` | `rgba(151, 112, 222, 0.24)` | Accent soft variant             |
| `--color-system-highlight`        | `#BBB1E2`                   | Shadow highlight base           |
| `--color-system-success`          | `#51E079`                   | Profit values                   |
| `--color-system-success-bright`   | `#8EFFBB`                   | Deposit highlight, profit alt   |
| `--color-system-warning`          | `#FCB95B`                   | Chat @mentions, amber accent    |

### 1.8 Orange (Badge)

| Variable                      | HEX       | Usage                         |
| ----------------------------- | --------- | ----------------------------- |
| `--color-system-orange-dark`  | `#D75B26` | MODER badge gradient start    |
| `--color-system-orange`       | `#F5A649` | MODER badge mid, balance glow |
| `--color-system-orange-light` | `#FFC061` | MODER badge gradient end      |

### 1.9 Avatars

| Variable                         | HEX       | Usage                     |
| -------------------------------- | --------- | ------------------------- |
| `--color-system-avatar-purple`   | `#3C3257` | Profile avatar background |
| `--color-system-avatar-lavender` | `#908CC2` | Chat avatar variant       |
| `--color-system-avatar-peach`    | `#DFC9C4` | Chat avatar variant       |
| `--color-system-avatar-mint`     | `#C3FAE2` | Chat/table avatar variant |

---

## 2. Gradients

All gradient tokens follow `--gradient-system-{name}`.
Every gradient uses `var()` references — zero hardcoded HEX/RGB values.
Opacity variants use `color-mix(in srgb, var(--color), transparent N%)`.

### 2.1 Primary Gradients

| Variable                          | Angle  | Composition                            | Usage                                 |
| --------------------------------- | ------ | -------------------------------------- | ------------------------------------- |
| `--gradient-system-primary-stops` | —      | Reusable stop list                     | Shared base for all primary gradients |
| `--gradient-system-primary`       | 28.44° | `var(--gradient-system-primary-stops)` | Buttons, active tabs, CTAs            |
| `--gradient-system-primary-flat`  | 10.23° | Same stops                             | Smaller elements, flat buttons        |
| `--gradient-system-logo`          | 23.43° | Same stops                             | Logo icon, sidebar badge icon         |
| `--gradient-system-primary-faded` | 15.62° | Stops at 48% opacity                   | Sidebar bonus badges                  |

### 2.2 Surface Gradients

| Variable                          | Composition                                 | Usage                       |
| --------------------------------- | ------------------------------------------- | --------------------------- |
| `--gradient-system-page`          | `bg → bg-alt`                               | Body background             |
| `--gradient-system-page-overlay`  | `overlay → overlay-alt` at 32%              | Page overlay layer          |
| `--gradient-system-card`          | `card → card-alt`                           | Stat cards, profile panel   |
| `--gradient-system-surface`       | `surface → surface-alt`                     | Secondary button base       |
| `--gradient-system-vip`           | `deep → deep-alt`                           | VIP feature cards           |
| `--gradient-system-secondary`     | Accent-soft tint + surface gradient         | Secondary buttons, settings |
| `--gradient-system-modal`         | `overlay/overlay-alt` at 64% + `modal-base` | Modal dialog body           |
| `--gradient-system-modal-overlay` | `bg/bg-alt` at 64%                          | Modal backdrop              |

### 2.3 Glass Gradients

| Variable                         | Opacity | Usage                          |
| -------------------------------- | ------- | ------------------------------ |
| `--gradient-system-glass`        | 64%     | Nav bars, table rows           |
| `--gradient-system-glass-opaque` | 100%    | Active tabs, currency selector |
| `--gradient-system-glass-dense`  | 84%     | Auth page panels               |

### 2.4 Specialty Gradients

| Variable                         | Usage                         |
| -------------------------------- | ----------------------------- |
| `--gradient-system-input`        | Currency inputs, balance area |
| `--gradient-system-hero-overlay` | Hero banner dark overlay      |
| `--gradient-system-game-overlay` | Game card image overlay       |
| `--gradient-system-chat-bonus`   | Chat bonus bar                |
| `--gradient-system-badge-mod`    | MODER badge                   |

### 2.5 Text Gradients

| Variable                         | Usage                                      |
| -------------------------------- | ------------------------------------------ |
| `--gradient-system-text-heading` | `white → shimmer` — heading gradient       |
| `--gradient-system-text-brand`   | Primary stops — copyright brand, logo text |

---

## 3. Typography

### 3.1 Font Families

| Variable                  | Value                   | Usage                        |
| ------------------------- | ----------------------- | ---------------------------- |
| `--font-system-primary`   | `'Fredoka', sans-serif` | All UI text                  |
| `--font-system-logo`      | `'Notable', sans-serif` | Logo "X1" only               |
| `--font-system-variation` | `'wdth' 100`            | Required on ALL Fredoka text |

> All Fredoka text MUST include `font-variation-settings: var(--font-system-variation)` or use the `.system-font` utility class.

### 3.2 Type Scale

| Style          | Font    | Weight | Size | Line Height | Letter Spacing | Usage                           |
| -------------- | ------- | ------ | ---- | ----------- | -------------- | ------------------------------- |
| `display-logo` | Notable | 400    | 92px | —           | —              | Homepage logo                   |
| `heading-logo` | Notable | 400    | 40px | 40px        | —              | Header/footer logo              |
| `heading-xl`   | Fredoka | 600    | 24px | 28–32px     | 0.288px        | Section titles, deposit heading |
| `heading-lg`   | Fredoka | 600    | 20px | 24px        | 0.8px          | Modal titles, uppercase labels  |
| `heading-md`   | Fredoka | 600    | 18px | 20px        | 1.08px         | Usernames, card titles          |
| `body-lg`      | Fredoka | 500    | 16px | 20–24px     | 0–0.96px       | Nav items, body text, buttons   |
| `body-md`      | Fredoka | 500    | 14px | 16–20px     | 0–0.28px       | Labels, secondary text, chat    |
| `body-sm`      | Fredoka | 500    | 13px | 16px        | —              | Tab labels, badge text          |
| `caption`      | Fredoka | 500    | 12px | 12–16px     | 0.72px         | Stat labels, timestamps, badges |
| `caption-xs`   | Fredoka | 600    | 10px | 8px         | 0.2px          | MODER badge text                |

---

## 4. Spacing

### 4.1 Scale

| Variable             | Value | Usage                                    |
| -------------------- | ----- | ---------------------------------------- |
| `--space-system-0`   | 0px   | —                                        |
| `--space-system-0-5` | 2px   | VIP card title/subtitle gap              |
| `--space-system-1`   | 4px   | Micro gaps                               |
| `--space-system-2`   | 8px   | Icon-to-text inline gap                  |
| `--space-system-3`   | 12px  | Sidebar padding, table row gap           |
| `--space-system-4`   | 16px  | Card inner padding                       |
| `--space-system-5`   | 20px  | Game card grid gap, content padding      |
| `--space-system-6`   | 24px  | Sidebar icon-text gap, nav padding       |
| `--space-system-8`   | 32px  | Section gaps, footer column gap          |
| `--space-system-10`  | 40px  | Footer social icon spacing               |
| `--space-system-12`  | 48px  | Logo size, social containers, tab height |
| `--space-system-16`  | 64px  | Sidebar bonus badge height               |

### 4.2 Layout Spacing Patterns

| Pattern                | Value                | Context                     |
| ---------------------- | -------------------- | --------------------------- |
| Page outer padding     | 24px top, 20px sides | Root container              |
| Sidebar item gap       | 32px vertical        | Between nav groups          |
| Sidebar icon-label gap | 24px horizontal      | Between icon and text       |
| Content-to-sidebar gap | 60px (320 − 260)     | Between sidebar and content |
| Game card gap          | 20px                 | Grid gap                    |
| Table row height       | 64px                 | Bets/leaderboard rows       |
| Modal inner padding    | 20px horizontal      | Deposit/withdrawal content  |

---

## 5. Borders & Effects

### 5.1 Border Radius

| Variable               | Value | Usage                                               |
| ---------------------- | ----- | --------------------------------------------------- |
| `--radius-system-xs`   | 6px   | Inactive tab backgrounds                            |
| `--radius-system-sm`   | 8px   | Level badge, small elements                         |
| `--radius-system-base` | 12px  | Active tabs, sidebar nav, buttons (small), avatars  |
| `--radius-system-lg`   | 14px  | Game thumbnails                                     |
| `--radius-system-xl`   | 16px  | Cards, tabs container, balance area, VIP cards      |
| `--radius-system-2xl`  | 20px  | Navigation bars                                     |
| `--radius-system-3xl`  | 22px  | Input fields (inner)                                |
| `--radius-system-4xl`  | 24px  | Inputs (outer), buttons (large), modal, hero banner |
| `--radius-system-5xl`  | 32px  | Page container                                      |
| `--radius-system-full` | 71px  | Hero CTA (circular)                                 |

### 5.2 Border Widths

| Width | Usage                                                       |
| ----- | ----------------------------------------------------------- |
| 1px   | Separator lines                                             |
| 1.5px | VIP card stroke overlay                                     |
| 1.6px | Modal border                                                |
| 2px   | Standard component border (buttons, inputs, avatars, cards) |
| 2.4px | Hero CTA button border                                      |

### 5.3 Shadows

| Variable                       | Usage                                      |
| ------------------------------ | ------------------------------------------ |
| `--shadow-system-base`         | Default elevation — cards, buttons, panels |
| `--shadow-system-glow`         | Purple glow — active primary buttons       |
| `--shadow-system-combined`     | Glow + base — primary CTAs                 |
| `--shadow-system-inner-panel`  | Glass panel inner highlight                |
| `--shadow-system-inner-input`  | Input field pressed effect                 |
| `--shadow-system-inner-banner` | Hero banner inner glow                     |
| `--shadow-system-inner-card`   | Game card inner highlight                  |
| `--shadow-system-inner-button` | Hero CTA inner highlight                   |

All shadow values use `color-mix()` to derive opacity from base color variables (`--color-system-highlight`, `--color-system-primary-mid`, `--color-system-ink`).

### 5.4 Blur & Glassmorphism

| Variable              | Value | Usage                                     |
| --------------------- | ----- | ----------------------------------------- |
| `--blur-system-glass` | 42px  | Navigation bars, table rows, glass panels |
| `--blur-system-glow`  | 8px   | Coin glow effect                          |

**Pre-built glass utility classes:**

| Class                  | Background                              | Blur | Radius | Shadow |
| ---------------------- | --------------------------------------- | ---- | ------ | ------ |
| `.system-glass`        | `--gradient-system-glass` (64%)         | 42px | 20px   | base   |
| `.system-glass-opaque` | `--gradient-system-glass-opaque` (100%) | 42px | 12px   | base   |
| `.system-glass-dense`  | `--gradient-system-glass-dense` (84%)   | 42px | 24px   | —      |

---

## 6. Layout

### 6.1 Grid / Container

| Variable                        | Value  | Description                    |
| ------------------------------- | ------ | ------------------------------ |
| `--layout-system-canvas`        | 1920px | Desktop design reference width |
| `--layout-system-sidebar`       | 260px  | Left navigation sidebar        |
| `--layout-system-content-start` | 320px  | Sidebar + 60px gap             |
| `--layout-system-content`       | 1180px | Main content zone              |
| `--layout-system-right-panel`   | 360px  | Chat/info panel                |

### 6.2 Page Structure

```
┌──────────────────────────────── 1920px ────────────────────────────────┐
│                                                                        │
│  ┌──────────┐  ┌────────────────────────┐  ┌───────────────────────┐  │
│  │ Sidebar  │  │     Main Content       │  │    Right Panel        │  │
│  │  260px   │  │       1180px           │  │      360px            │  │
│  │          │  │                        │  │                       │  │
│  │          │  │                        │  │  (Chat/Info/Wallet)   │  │
│  └──────────┘  └────────────────────────┘  └───────────────────────┘  │
│   ← 20px →  ← 60px gap →                                             │
│              Content starts at x=320                                   │
└────────────────────────────────────────────────────────────────────────┘
```

### 6.3 Key Dimensions

| Component            | Width      | Height      | Radius                                          |
| -------------------- | ---------- | ----------- | ----------------------------------------------- |
| Sidebar              | 260px      | Full height | —                                               |
| Logo icon            | 48px       | 48px        | `--radius-system-base`                          |
| Bonus badge          | 124px      | 64px        | `--radius-system-base`                          |
| Settings button      | 260px      | 48px        | `--radius-system-xl`                            |
| Hero banner          | 1180px     | 520px       | `--radius-system-4xl`                           |
| Game card (featured) | 280px      | 280px       | `--radius-system-4xl`                           |
| Game card (grid)     | 180px      | 220px       | `--radius-system-lg`                            |
| Tab bar              | full width | 64px        | `--radius-system-2xl`                           |
| Table row            | 1180px     | 64px        | `--radius-system-2xl`                           |
| Avatar (table)       | 40px       | 40px        | `--radius-system-base`                          |
| Avatar (profile)     | 80px       | 80px        | `--radius-system-xl`                            |
| Input field          | full width | 48px        | `--radius-system-base` to `--radius-system-4xl` |
| Button (primary)     | varies     | 48px        | `--radius-system-base` to `--radius-system-4xl` |
| Hero CTA             | 120px      | 120px       | `--radius-system-full`                          |
| Modal dialog         | 460px      | 584px       | `--radius-system-4xl`                           |
| Footer               | 1180px     | 440px       | `--radius-system-4xl`                           |
| MODER badge          | 48px       | 16px        | 7.33px                                          |
| Coin icon            | 32px       | 32px        | —                                               |

---

## 7. Components

All examples use CSS variables and Tailwind system-\* utilities. Zero hardcoded HEX/RGB values.

### 7.1 Buttons

#### Primary Button

```tsx
<button
	className="
    relative h-12 px-6
    border-2 border-system-border
    rounded-system-base
    font-fredoka font-semibold text-sm text-system-white
    tracking-wide
    shadow-system-combined
    system-font
  "
	style={{ background: "var(--gradient-system-primary)" }}
>
	<span className="absolute inset-0 rounded-[inherit] shadow-system-inner-button pointer-events-none" />
	Copy
</button>
```

| Property     | Token                                                                   |
| ------------ | ----------------------------------------------------------------------- |
| Background   | `var(--gradient-system-primary)`                                        |
| Border       | `2px solid var(--color-system-border)`                                  |
| Radius       | `var(--radius-system-base)` (12px) or `var(--radius-system-4xl)` (24px) |
| Shadow       | `var(--shadow-system-combined)`                                         |
| Text         | Fredoka SemiBold 14–16px, `var(--color-system-white)`                   |
| Inner shadow | `var(--shadow-system-inner-button)`                                     |

#### Secondary Button

```tsx
<button
	className="
    h-12 px-6
    border-2 border-system-border
    rounded-system-xl
    font-fredoka font-semibold text-base text-system-muted
    shadow-system-base
    system-font
  "
	style={{ background: "var(--gradient-system-secondary)" }}
>
	Settings
</button>
```

#### Hero CTA Button (Circular)

```tsx
<button
	className="
    relative size-[120px]
    border-[2.4px] border-system-border
    rounded-system-full
    flex items-center justify-center
    shadow-system-base
  "
	style={{ background: "var(--gradient-system-primary)" }}
>
	<span className="absolute inset-0 rounded-[inherit] shadow-system-inner-button pointer-events-none" />
	{/* Arrow icon */}
</button>
```

#### Tab Toggle (Crypto / Credit Card)

```tsx
<div
	className="h-12 rounded-system-base flex shadow-system-inner-input"
	style={{ background: "var(--gradient-system-input)" }}
>
	{/* Active tab */}
	<button
		className="
      h-12 w-[198px]
      border-2 border-system-border
      rounded-system-base
      font-fredoka font-medium text-base text-system-white
      shadow-system-combined
      system-font
    "
		style={{ background: "var(--gradient-system-primary)" }}
	>
		Crypto
	</button>

	{/* Inactive tab */}
	<button className="h-12 font-fredoka font-medium text-base text-system-placeholder-alt system-font">
		Credit Card
	</button>
</div>
```

### 7.2 Cards

#### Game Card (Featured — 280×280)

```tsx
<div className="relative w-[280px] h-[280px] rounded-system-4xl overflow-hidden">
	<img
		className="absolute inset-0 w-full h-full object-cover"
		src={gameImage}
		alt=""
	/>
	<div className="absolute inset-0 rounded-[inherit] shadow-system-inner-card pointer-events-none" />
	<div
		className="absolute inset-0"
		style={{ background: "var(--gradient-system-game-overlay)" }}
	/>
	<div className="absolute bottom-8 left-6">
		<h3 className="font-fredoka font-semibold text-lg text-system-white tracking-[1.08px] system-font">
			Xone
		</h3>
		<p className="font-fredoka font-medium text-base text-system-muted system-font">
			Video about our project
		</p>
	</div>
</div>
```

#### Stat Card

```tsx
<div
	className="relative rounded-system-xl p-4 shadow-system-base"
	style={{ background: "var(--gradient-system-card)" }}
>
	<p className="font-fredoka font-semibold text-lg text-system-white tracking-[1.08px] system-font">
		23.561
	</p>
	<p className="font-fredoka font-medium text-xs text-system-muted tracking-[0.72px] uppercase system-font">
		TOTAL WINS
	</p>
</div>
```

#### VIP Feature Card

```tsx
<div
	className="
    relative h-[72px] w-[474px]
    rounded-system-xl
    border-2 border-system-border
    shadow-system-base
    overflow-hidden
  "
	style={{ background: "var(--gradient-system-vip)" }}
>
	<div className="absolute inset-0 border-[1.5px] border-system-stroke opacity-20 rounded-system-xl" />
	<img
		className="absolute left-5 top-4 w-8 h-[38px] object-cover"
		src={icon}
		alt=""
	/>
	<div className="absolute left-[78px] top-4 flex flex-col gap-0.5">
		<p className="font-fredoka font-medium text-base text-system-white system-font">
			Increased Cashback
		</p>
		<p className="font-fredoka font-medium text-sm text-system-stroke tracking-[-0.2px] system-font">
			Receive up to 25% of your coins back
		</p>
	</div>
</div>
```

### 7.3 Inputs / Forms

#### Text Input (Auth Forms)

```tsx
<div className="system-glass-dense">
	<div className="relative rounded-system-3xl bg-system-input/84 shadow-system-inner-input">
		<input
			className="
        w-full h-12 px-6
        bg-transparent
        font-fredoka font-medium text-lg text-system-white
        placeholder:text-system-placeholder
        outline-none
        system-font
      "
			placeholder="Enter Email"
		/>
	</div>
</div>
```

#### Currency Input (Deposit)

```tsx
<div
	className="relative h-12 rounded-system-base shadow-system-inner-input"
	style={{ background: "var(--gradient-system-input)" }}
>
	{/* Currency selector */}
	<div
		className="
    absolute left-0 top-0 h-12 w-[124px]
    system-glass-opaque
    flex items-center gap-2 px-4
  "
	>
		<img className="size-5" src={usdtIcon} alt="USDT" />
		<span className="font-fredoka font-medium text-base text-system-white text-center system-font">
			USDT
		</span>
	</div>

	<input
		className="
      w-full h-full pl-[140px] pr-4
      bg-transparent
      font-fredoka font-medium text-base text-system-placeholder-alt
      outline-none system-font
    "
		placeholder="0.000000"
	/>
</div>
```

### 7.4 Modal / Dialog

> **Note:** Deposit and Withdrawal are Modals, not standalone pages.

```tsx
{
	/* Backdrop */
}
<div
	className="fixed inset-0 rounded-system-5xl"
	style={{ background: "var(--gradient-system-modal-overlay)" }}
/>;

{
	/* Dialog panel */
}
<div
	className="
    w-[460px] h-[584px]
    border-[1.6px]
    rounded-system-4xl
    shadow-system-base
  "
	style={{
		background: "var(--gradient-system-modal)",
		borderColor:
			"color-mix(in srgb, var(--color-system-border), transparent 52%)",
	}}
>
	<h2 className="font-fredoka font-semibold text-xl text-system-white tracking-[0.8px] uppercase system-font">
		DEPOSIT
	</h2>
	{/* Close button: absolute top-right */}
	{/* Content */}
</div>;
```

### 7.5 Navigation

#### Sidebar

```tsx
<aside className="w-[260px] h-full flex flex-col">
	{/* Logo */}
	<div className="flex items-center gap-4 px-5 py-8">
		<div
			className="size-12 rounded-system-base shadow-system-base"
			style={{ background: "var(--gradient-system-primary)" }}
		/>
		<span className="font-notable text-[40px]">
			<span className="system-text-brand">X</span>
			<span className="text-system-white">1</span>
		</span>
	</div>

	{/* Bonus badges */}
	<div className="flex gap-3 px-5">
		<div
			className="w-[124px] h-16 rounded-system-base"
			style={{ background: "var(--gradient-system-primary-faded)" }}
		>
			<span className="font-fredoka font-semibold text-lg system-text-gradient system-font">
				BONUS
			</span>
		</div>
	</div>

	{/* Navigation items */}
	<nav className="flex flex-col gap-8 px-6 mt-6">
		{/* Active */}
		<a className="flex items-center gap-6">
			<div className="size-6">{/* icon */}</div>
			<span className="font-fredoka font-medium text-base text-system-white system-font">
				My Account
			</span>
		</a>
		{/* Inactive */}
		<a className="flex items-center gap-6">
			<div className="size-6">{/* icon */}</div>
			<span className="font-fredoka font-medium text-base text-system-subtle system-font">
				Home
			</span>
		</a>
	</nav>

	{/* Settings button */}
	<button
		className="
      mx-5 mt-auto mb-4
      h-12 rounded-system-xl
      border-2 border-system-border
      font-fredoka font-medium text-base text-system-subtle
      shadow-system-base system-font
    "
		style={{ background: "var(--gradient-system-secondary)" }}
	>
		Settings
	</button>
</aside>
```

#### Game Categories Nav Bar

```tsx
<div className="system-glass h-16 w-full flex items-center gap-4 px-4">
	{/* Active tab */}
	<button
		className="
      h-10 px-4
      rounded-system-base
      border-2 border-system-border
      shadow-system-combined
      font-fredoka font-medium text-[13px] text-system-white system-font
    "
		style={{ background: "var(--gradient-system-primary)" }}
	>
		All Games
	</button>

	{/* Inactive tab */}
	<button className="h-10 px-4 rounded-system-sm font-fredoka font-medium text-[13px] text-system-muted system-font">
		Live Games
	</button>
</div>
```

#### Bets / Leaderboard Tab Bar

```tsx
<div className="flex items-center gap-0">
	{/* Active tab */}
	<button
		className="
    h-16 px-6
    system-glass-opaque
    font-fredoka font-medium text-base text-system-white tracking-[0.32px] system-font
  "
	>
		LEADERBOARD
	</button>

	{/* Inactive tab */}
	<button
		className="
    h-16 px-6
    system-glass
    font-fredoka font-medium text-base text-system-muted tracking-[0.32px] system-font
  "
	>
		BETS
	</button>
</div>
```

### 7.6 Table (Bets / Leaderboard)

```tsx
<div className="system-glass system-inner-shadow relative h-16 w-full flex items-center px-6">
	{/* Avatar */}
	<div className="size-10 rounded-system-base border-2 border-system-divider overflow-hidden">
		<div className="absolute inset-0 bg-system-avatar-mint rounded-system-base" />
		<img className="relative size-full object-cover" src={avatar} alt="" />
	</div>

	{/* Username */}
	<span className="ml-4 font-fredoka font-semibold text-base text-system-white tracking-[0.96px] system-font">
		Jason
	</span>

	{/* Game */}
	<span className="font-fredoka font-medium text-base text-system-white tracking-[0.96px] system-font">
		Tiki Runner 2
	</span>

	{/* Bet amount */}
	<div className="flex items-center gap-2">
		<img className="size-8" src={coinIcon} alt="" />
		<span className="font-fredoka font-medium text-base text-system-white tracking-[0.96px] system-font">
			50.00
		</span>
	</div>

	{/* Multiplier */}
	<span className="font-fredoka font-medium text-sm text-system-white tracking-[0.28px] system-font">
		7.2x
	</span>

	{/* Profit */}
	<div className="flex items-center gap-2">
		<img className="size-8" src={coinIcon} alt="" />
		<span className="font-fredoka font-medium text-base text-system-success-bright tracking-[0.96px] system-font">
			1 420.00
		</span>
	</div>
</div>
```

### 7.7 Chat Panel

```tsx
<div className="w-[360px] h-full flex flex-col">
	{/* Tab header */}
	<div className="flex">
		<button className="font-fredoka font-medium text-base text-system-white px-4 py-2 border-b-2 border-system-border system-font">
			Chat
		</button>
		<button className="font-fredoka font-medium text-base text-system-muted px-4 py-2 system-font">
			Messages
		</button>
		<button className="font-fredoka font-medium text-base text-system-muted px-4 py-2 system-font">
			Friends
		</button>
	</div>

	{/* Bonus banner */}
	<div
		className="h-24 rounded-b-system-xl shadow-system-base"
		style={{ background: "var(--gradient-system-chat-bonus)" }}
	>
		<h3 className="font-fredoka font-semibold text-lg text-system-white system-font">
			Claim Bonus
		</h3>
		<p className="font-fredoka font-medium text-base text-system-muted system-font">
			Daily Bonus for you!
		</p>
	</div>

	{/* Messages */}
	<div className="flex-1 overflow-y-auto space-y-4 p-4">
		{/* Standard message */}
		<div>
			<div className="flex items-center gap-2 mb-1">
				{/* Avatar: 40px, rounded-system-base, border-2 border-system-divider */}
				<span className="font-fredoka font-semibold text-base text-system-white system-font">
					Clarck
				</span>
				<span className="font-fredoka font-medium text-xs text-system-dim system-font">
					1 min ago
				</span>
			</div>
			<p className="font-fredoka font-medium text-sm text-system-muted leading-[1.4] system-font">
				Now I'll go play the slots, there's a new update with new games
			</p>
		</div>

		{/* MODER message */}
		<div>
			<div className="flex items-center gap-2 mb-1">
				<span className="font-fredoka font-semibold text-base text-system-white system-font">
					Jason
				</span>
				<span
					className="h-4 px-2 rounded-[7.33px] font-fredoka font-semibold text-[10px] text-system-ink tracking-[0.2px] system-font"
					style={{ background: "var(--gradient-system-badge-mod)" }}
				>
					MODER
				</span>
				<span className="font-fredoka font-medium text-xs text-system-dim system-font">
					1 min ago
				</span>
			</div>
			<p className="font-fredoka font-medium text-sm text-system-muted leading-[1.4] system-font">
				<span className="text-system-warning">@clarck</span> always
				welcome, you can ping me if you need help
			</p>
		</div>
	</div>

	{/* Message input */}
	<div className="px-4 pb-4">
		<input
			className="
        w-full h-12
        bg-transparent
        rounded-system-xl
        font-fredoka font-medium text-base text-system-white
        placeholder:text-system-muted
        system-font
      "
			placeholder="Type your Message"
		/>
	</div>
</div>
```

### 7.8 Footer

```tsx
<footer className="w-[1180px] h-[440px] mt-auto">
	<div className="relative rounded-system-4xl overflow-hidden">
		{/* Logo */}
		<div className="flex items-center gap-4 mb-6">
			<div
				className="size-12 rounded-system-base"
				style={{ background: "var(--gradient-system-primary)" }}
			/>
			<span className="font-notable text-[40px]">
				<span className="system-text-brand">X</span>
				<span className="text-system-white">1</span>
			</span>
		</div>

		{/* Disclaimer */}
		<p className="font-fredoka font-normal text-[13px] text-system-dim leading-[1.48] w-[360px] system-font">
			This website offers gaming with risk experience. To be a user of our
			site you must be over 18 y.o. We are not responsible for the
			violation of your local laws related to igaming.
		</p>

		{/* Social icons — 40×40, gap 56px */}

		{/* Three nav columns */}
		{/* Header: font-fredoka font-medium text-base text-system-white tracking-[0.32px] */}
		{/* Links: font-fredoka font-medium text-base text-system-muted, gap-8 vertical */}

		{/* Separator */}
		<hr className="border-0 h-px bg-system-divider w-[1084px]" />

		{/* Payment icons — 24px height, opacity-60 */}

		{/* Separator */}
		<hr className="border-0 h-px bg-system-divider w-[1084px]" />

		{/* Copyright */}
		<p className="text-center">
			<span className="font-fredoka font-normal text-sm text-system-muted tracking-[0.14px] system-font">
				Copyright ©{" "}
			</span>
			<span className="font-fredoka font-normal text-sm system-text-brand system-font">
				******
			</span>
			<span className="font-fredoka font-normal text-sm text-system-muted tracking-[0.14px] system-font">
				{" "}
				All Reserved
			</span>
		</p>
	</div>
</footer>
```

### 7.9 User Profile Panel

```tsx
<div
	className="w-full rounded-system-xl p-4 shadow-system-base"
	style={{ background: "var(--gradient-system-card)" }}
>
	{/* Avatar */}
	<div className="size-20 rounded-system-xl border-2 border-system-border-strong bg-system-avatar-purple overflow-hidden">
		<img className="size-full object-cover" src={avatar} alt="" />
	</div>

	{/* Username — gradient text */}
	<h3 className="font-fredoka font-semibold text-lg tracking-[1.08px] system-text-gradient system-font">
		Neomodeon
	</h3>

	{/* Level badge */}
	<span
		className="h-5 px-2 rounded-system-sm font-fredoka font-medium text-xs text-system-white system-font"
		style={{ background: "var(--gradient-system-primary)" }}
	>
		14
	</span>

	{/* Experience */}
	<p className="font-fredoka font-medium text-sm text-system-muted system-font">
		Need Exp: 4,400
	</p>

	{/* Balance area */}
	<div
		className="rounded-system-xl p-3 shadow-system-inner-input"
		style={{ background: "var(--gradient-system-input)" }}
	>
		<div className="flex items-center gap-2">
			<span className="font-fredoka font-semibold text-lg text-system-white tracking-[1.08px] system-font">
				244,455.50
			</span>
		</div>
		{/* Deposit / Withdraw buttons */}
	</div>
</div>
```

---

## 8. Icons & Assets

### 8.1 Icon System

All icons are 24×24px SVG (hugeicons library).

| Category       | Icons                                                                                       | Size        |
| -------------- | ------------------------------------------------------------------------------------------- | ----------- |
| **Navigation** | Home, Games, Promotions, My Account, Deposit, Withdrawal, Support, VIP Club, Ranks          | 24×24px     |
| **Actions**    | Settings, Logout, Arrow Right/Up/Down, Copy, Close                                          | 24×24px     |
| **Social**     | X (Twitter), Telegram, Discord, Instagram, Facebook                                         | 40×40px     |
| **Payment**    | Bitcoin, Ethereum, USDC, Dogecoin, Binance, Tether, Visa, Mastercard, Apple Pay, Google Pay | 24px height |
| **Chat**       | Emoji, Send, More (three dots)                                                              | 24×24px     |

### 8.2 Icon Styling

- **Sidebar icons:** 24×24px — `var(--color-system-subtle)` inactive, `var(--color-system-white)` active
- **Social icons:** 40×40px in rounded containers
- **Payment icons:** 24px height, opacity 60% in footer
- **Action icons:** Inside gradient containers (send button uses `var(--gradient-system-primary)`)

### 8.3 Avatar Placeholders

| Variable                         | Usage                     |
| -------------------------------- | ------------------------- |
| `--color-system-avatar-purple`   | Profile avatar fallback   |
| `--color-system-avatar-lavender` | Chat avatar variant       |
| `--color-system-avatar-peach`    | Chat avatar variant       |
| `--color-system-avatar-mint`     | Table/chat avatar variant |

---

## 9. Pages & Routes

### 9.1 Page Routes

| Route                   | Page                 | Layout      | Key Components                                              |
| ----------------------- | -------------------- | ----------- | ----------------------------------------------------------- |
| `/`                     | Home                 | CasinoShell | Hero banner, game cards, categories nav, bets table, footer |
| `/games/:id`            | Game Page            | CasinoShell | Game player, game details                                   |
| `/profile`              | Profile              | CasinoShell | **Tabbed page** — see 9.2                                   |
| `/promotions`           | Promotions           | PublicShell | Promotion cards, offers                                     |
| `/vip-club`             | VIP Club             | PublicShell | VIP tiers, feature cards, FAQ accordion                     |
| `/terms-and-conditions` | Terms & Conditions   | PublicShell | Legal text content                                          |
| `/privacy-policy`       | Privacy Policy       | PublicShell | Legal text content                                          |
| `/responsible-gambling` | Responsible Gambling | PublicShell | Legal text content                                          |

### 9.2 Profile Page (Tabbed)

The Profile page is a **single page** at `/profile` with three tabs:

| Tab             | Content                                                                |
| --------------- | ---------------------------------------------------------------------- |
| **Leaderboard** | Stat cards (Total Wins / Total Bets), leaderboard table, profile panel |
| **Bets**        | User bet history table                                                 |
| **Transaction** | Transaction history table                                              |

Tabs switch content dynamically without changing the URL.

### 9.3 Modal Overlays

These are **NOT standalone pages** — they are modal dialogs overlaid on the current page:

| Modal                    | Trigger                                   | Content                                     |
| ------------------------ | ----------------------------------------- | ------------------------------------------- |
| **Sign In**              | "Log in" button in header/sidebar         | Login form, OAuth, forgot password          |
| **Registration**         | "Sign up" button in header/sidebar        | Multi-step registration form                |
| **Deposit**              | "Deposit" button in sidebar/balance area  | Crypto/Card toggle, QR code, currency input |
| **Deposit (variant)**    | Alternative deposit view                  | Different deposit flow                      |
| **Withdrawal**           | "Withdraw" button in sidebar/balance area | Withdrawal form, currency selector          |
| **Withdrawal (variant)** | Alternative withdrawal view               | Different withdrawal flow                   |

### 9.4 Figma Node Reference

| Node ID     | Name                   | Maps To                      |
| ----------- | ---------------------- | ---------------------------- |
| `2:4`       | Home                   | `/`                          |
| `140:523`   | Game Page              | `/games/:id`                 |
| `140:2299`  | Promotions             | `/promotions`                |
| `76:9811`   | VIP Club               | `/vip-club`                  |
| `341:176`   | Terms & Conditions     | `/terms-and-conditions`      |
| `140:2`     | Profile (Leaderboard)  | `/profile` — Leaderboard tab |
| `206:8391`  | Profile (Bets)         | `/profile` — Bets tab        |
| `206:9023`  | Profile (Transaction)  | `/profile` — Transaction tab |
| `60:54`     | Sign In                | Sign In Modal                |
| `30:745`    | Registration           | Registration Modal (step 1)  |
| `61:108`    | Registration (variant) | Registration Modal (step 2)  |
| `206:9623`  | Deposit                | Deposit Modal                |
| `206:10206` | Deposit (variant)      | Deposit Modal variant        |
| `206:10820` | Withdrawal             | Withdrawal Modal             |
| `206:11450` | Withdrawal (variant)   | Withdrawal Modal variant     |

---

## File Structure

| File                           | Purpose                                                                                                     |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `src/styles/design-tokens.css` | All CSS variables (colors, gradients, typography, spacing, radius, shadows, blur, layout) + utility classes |
| `src/styles/animations.css`    | Keyframes, timing variables, animation utility classes                                                      |
| `src/styles/globals.css`       | Tailwind imports, shadcn config, @theme inline (maps system variables to Tailwind utilities)                |

---

_Generated from Figma file `iOAsLMFTsuLNoKiXwo2vhB` — 364 XONE Project_
_All tokens implemented in `src/styles/design-tokens.css` — zero hardcoded values._
