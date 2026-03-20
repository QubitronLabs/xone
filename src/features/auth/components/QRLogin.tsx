"use client";

import { useTranslations } from "next-intl";

export function QRLogin() {
	const t = useTranslations("auth");

	return (
		<div className="flex flex-col items-center gap-4 py-8">
			<div className="flex h-48 w-48 items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25">
				<span className="text-sm text-muted-foreground">
					{t("qrLoginTitle")}
				</span>
			</div>
			<p className="text-center text-sm text-muted-foreground">
				{t("qrLoginSubtitle")}
			</p>
		</div>
	);
}
