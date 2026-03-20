"use client";

import { useTranslations } from "next-intl";

export function TipModal() {
	const t = useTranslations("wallet");

	return (
		<div className="space-y-4 p-4">
			<h3 className="text-lg font-semibold">{t("sendTip")}</h3>
			<input
				type="text"
				placeholder={t("tipRecipient")}
				className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
			/>
			<input
				type="number"
				placeholder={t("amount")}
				className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
			/>
			<button className="flex h-10 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground">
				{t("sendTip")}
			</button>
		</div>
	);
}
