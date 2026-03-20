"use client";

import { useTranslations } from "next-intl";
import { APP_CONFIG } from "@/config/app.config";

export function DepositTab() {
	const t = useTranslations("wallet");

	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold">{t("deposit")}</h3>
			<p className="text-sm text-muted-foreground">
				{t("depositDescription", { name: APP_CONFIG.name })}
			</p>
			<div className="rounded-lg border border-border bg-muted/30 p-4">
				<p className="text-xs text-muted-foreground">
					{t("yourDepositAddress")}
				</p>
				<p className="mt-1 break-all font-mono text-sm">
					{t("connectWalletToView")}
				</p>
			</div>
		</div>
	);
}
