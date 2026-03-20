"use client";

import { cn } from "@/lib/utils";
import type { Bonus } from "../types";

interface BonusCardProps {
	bonus: Bonus;
	onClaim?: (bonusId: string) => void;
	isClaimPending?: boolean;
}

export function BonusCard({ bonus, onClaim, isClaimPending }: BonusCardProps) {
	return (
		<div className="overflow-hidden rounded-xl border border-border bg-card">
			<div className="p-4">
				<div className="mb-2 flex items-center gap-2">
					<span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary capitalize">
						{bonus.type.replace("-", " ")}
					</span>
					{!bonus.isActive && (
						<span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
							Inactive
						</span>
					)}
				</div>
				<h3 className="text-lg font-semibold">{bonus.title}</h3>
				<p className="mt-1 text-sm text-muted-foreground">
					{bonus.description}
				</p>

				<div className="mt-3 grid grid-cols-2 gap-2 text-xs">
					<div>
						<span className="text-muted-foreground">Bonus</span>
						<p className="font-medium">{bonus.percentage}%</p>
					</div>
					<div>
						<span className="text-muted-foreground">Max</span>
						<p className="font-medium">${bonus.maxAmount}</p>
					</div>
					<div>
						<span className="text-muted-foreground">
							Min Deposit
						</span>
						<p className="font-medium">${bonus.minDeposit}</p>
					</div>
					<div>
						<span className="text-muted-foreground">Wager</span>
						<p className="font-medium">{bonus.wagerRequirement}x</p>
					</div>
				</div>
			</div>

			{bonus.isActive && !bonus.isClaimed && onClaim && (
				<div className="border-t border-border p-3">
					<button
						type="button"
						onClick={() => onClaim(bonus.id)}
						disabled={isClaimPending}
						className={cn(
							"w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground",
							isClaimPending && "opacity-50",
						)}
					>
						{isClaimPending ? "Claiming…" : "Claim Bonus"}
					</button>
				</div>
			)}
		</div>
	);
}
