"use client";

import { useTranslations } from "next-intl";

export function SwapTab() {
	const t = useTranslations("wallet");

	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold">{t("swap")}</h3>
			<p className="text-sm text-muted-foreground">
				{t("swapDescription")}
			</p>
			<div className="space-y-3">
				<div className="rounded-lg border border-border p-4">
					<p className="text-xs text-muted-foreground">
						{t("swapFrom")}
					</p>
					<input
						type="number"
						placeholder="0.00"
						className="mt-1 w-full border-0 bg-transparent text-2xl font-semibold outline-none"
					/>
				</div>
				<div className="flex justify-center">
					<div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background">
						↓
					</div>
				</div>
				<div className="rounded-lg border border-border p-4">
					<p className="text-xs text-muted-foreground">
						{t("swapTo")}
					</p>
					<input
						type="number"
						placeholder="0.00"
						readOnly
						className="mt-1 w-full border-0 bg-transparent text-2xl font-semibold outline-none"
					/>
				</div>
				<button className="flex h-10 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground">
					{t("swap")}
				</button>
			</div>
		</div>
	);
}
