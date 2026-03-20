"use client";

export function QRLogin() {
	return (
		<div className="flex flex-col items-center gap-4 py-8">
			<div className="flex h-48 w-48 items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25">
				<span className="text-sm text-muted-foreground">QR Code</span>
			</div>
			<p className="text-center text-sm text-muted-foreground">
				Scan this QR code with your mobile wallet to sign in instantly.
			</p>
		</div>
	);
}
