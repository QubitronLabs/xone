"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { BetHistoryEntry } from "../types";

interface BetHistoryTableProps {
	bets: BetHistoryEntry[];
	isLoading?: boolean;
}

export function BetHistoryTable({ bets, isLoading }: BetHistoryTableProps) {
	const t = useTranslations("bets");

	if (isLoading) {
		return (
			<div className="space-y-2">
				{Array.from({ length: 10 }, (_, i) => (
					<div
						key={i}
						className="h-10 animate-pulse rounded bg-muted"
					/>
				))}
			</div>
		);
	}

	return (
		<div className="overflow-x-auto rounded-xl border border-border">
			<table className="w-full text-sm">
				<thead className="bg-muted/30">
					<tr className="text-left text-xs text-muted-foreground">
						<th className="px-4 py-3 font-medium">{t("game")}</th>
						<th className="px-4 py-3 font-medium text-right">
							{t("bet")}
						</th>
						<th className="px-4 py-3 font-medium text-right">
							{t("multi")}
						</th>
						<th className="px-4 py-3 font-medium text-right">
							{t("payout")}
						</th>
						<th className="px-4 py-3 font-medium text-right">
							{t("time")}
						</th>
					</tr>
				</thead>
				<tbody>
					{bets.map((bet) => (
						<tr key={bet.id} className="border-t border-border/50">
							<td className="px-4 py-2 font-medium">
								{bet.gameName}
							</td>
							<td className="px-4 py-2 text-right tabular-nums">
								{bet.betAmount.toFixed(2)}
							</td>
							<td className="px-4 py-2 text-right tabular-nums">
								{bet.multiplier.toFixed(2)}x
							</td>
							<td
								className={cn(
									"px-4 py-2 text-right font-medium tabular-nums",
									bet.isWin
										? "text-green-500"
										: "text-red-500",
								)}
							>
								{bet.isWin ? "+" : "-"}
								{bet.payout.toFixed(2)}
							</td>
							<td className="px-4 py-2 text-right text-muted-foreground">
								{new Date(bet.timestamp).toLocaleTimeString()}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
