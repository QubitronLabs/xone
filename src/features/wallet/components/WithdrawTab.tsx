"use client";

import { useTranslations } from "next-intl";
import { APP_CONFIG } from "@/config/app.config";

export function WithdrawTab() {
	const t = useTranslations("wallet");

	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold">{t("withdraw")}</h3>
			<p className="text-sm text-muted-foreground">
				{t("withdrawDescription", { name: APP_CONFIG.name })}
			</p>
			<div className="space-y-3">
				<input
					type="text"
					placeholder={t("recipientPlaceholder")}
					className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
				/>
				<input
					type="number"
					placeholder={t("amount")}
					className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
				/>
				<button className="flex h-10 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground">
					{t("withdraw")}
				</button>
			</div>
		</div>
	);
}
