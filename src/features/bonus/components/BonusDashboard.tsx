"use client";

import { BonusCard } from "./BonusCard";
import { useBonusList, useClaimBonus } from "../hooks/useBonus";

export function BonusDashboard() {
	const { data: bonuses = [], isLoading } = useBonusList();
	const claimMutation = useClaimBonus();

	if (isLoading) {
		return (
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: 6 }, (_, i) => (
					<div
						key={i}
						className="h-64 animate-pulse rounded-xl bg-muted"
					/>
				))}
			</div>
		);
	}

	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{bonuses.map((bonus) => (
				<BonusCard
					key={bonus.id}
					bonus={bonus}
					onClaim={(id) => claimMutation.mutate(id)}
					isClaimPending={claimMutation.isPending}
				/>
			))}
		</div>
	);
}
