"use client";

import { useAffiliateStats } from "../hooks/useAffiliate";

export function AffiliateDashboard() {
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
		{ label: "Total Referrals", value: stats.totalReferrals },
		{ label: "Active Referrals", value: stats.activeReferrals },
		{
			label: "Total Earnings",
			value: `$${stats.totalEarnings.toFixed(2)}`,
		},
		{
			label: "Pending Earnings",
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
					Your Referral Link
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
						Copy
					</button>
				</div>
			</div>
		</div>
	);
}
