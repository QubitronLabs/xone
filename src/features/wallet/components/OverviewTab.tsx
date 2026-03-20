"use client";

import { useTranslations } from "next-intl";
import { useBalance } from "../hooks/useBalance";

export function OverviewTab() {
	const t = useTranslations("wallet");
	const { tokens, isLoading } = useBalance();

	if (isLoading) {
		return (
			<div className="space-y-3">
				{Array.from({ length: 3 }).map((_, i) => (
					<div
						key={i}
						className="h-16 animate-pulse rounded-lg bg-muted"
					/>
				))}
			</div>
		);
	}

	if (!tokens?.length) {
		return (
			<div className="py-12 text-center text-muted-foreground">
				{t("noTokens")}
			</div>
		);
	}

	return (
		<div className="space-y-3">
			{tokens.map((token) => (
				<div
					key={token.symbol}
					className="flex items-center justify-between rounded-lg border border-border p-4"
				>
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-bold">
							{token.symbol.slice(0, 2)}
						</div>
						<div>
							<p className="font-medium text-foreground">
								{token.name}
							</p>
							<p className="text-sm text-muted-foreground">
								{token.symbol}
							</p>
						</div>
					</div>
					<div className="text-right">
						<p className="font-medium text-foreground">
							{token.balance}
						</p>
						<p className="text-sm text-muted-foreground">
							${token.usdValue.toFixed(2)}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
