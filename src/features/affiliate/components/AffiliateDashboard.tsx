"use client";

import { useTranslations } from "next-intl";
import { useAffiliateStats } from "../hooks/useAffiliate";

export function AffiliateDashboard() {
	const t = useTranslations("affiliate");
	const tCommon = useTranslations("common");
	const { data: stats, isLoading } = useAffiliateStats();

	if (isLoading) {
		return (
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{Array.from({ length: 4 }, (_, i) => (
					<div
						key={i}
						className="h-28 animate-pulse rounded-xl bg-muted"
					/>
				))}
			</div>
		);
	}

	if (!stats) return null;

	const cards = [
		{ label: t("totalReferrals"), value: stats.totalReferrals },
		{ label: t("activeReferrals"), value: stats.activeReferrals },
		{
			label: t("totalEarnings"),
			value: `$${stats.totalEarnings.toFixed(2)}`,
		},
		{
			label: t("pendingEarnings"),
			value: `$${stats.pendingEarnings.toFixed(2)}`,
		},
	];

	return (
		<div className="space-y-6">
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{cards.map((card) => (
					<div
						key={card.label}
						className="rounded-xl border border-border bg-card p-4"
					>
						<p className="text-xs text-muted-foreground">
							{card.label}
						</p>
						<p className="mt-1 text-2xl font-bold">{card.value}</p>
					</div>
				))}
			</div>

			<div className="rounded-xl border border-border bg-card p-4">
				<p className="text-sm text-muted-foreground">
					{t("referralLink")}
				</p>
				<div className="mt-2 flex gap-2">
					<input
						readOnly
						value={stats.referralLink}
						className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm"
					/>
					<button
						type="button"
						onClick={() =>
							navigator.clipboard.writeText(stats.referralLink)
						}
						className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
					>
						{tCommon("copy")}
					</button>
				</div>
			</div>
		</div>
	);
}
