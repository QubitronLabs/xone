import { cn } from "@/lib/utils";
import type { LiveBet } from "../types";

interface BetRowProps {
	bet: LiveBet;
}

export function BetRow({ bet }: BetRowProps) {
	return (
		<div className="flex items-center gap-3 border-b border-border/50 px-4 py-2 text-sm">
			<span className="w-24 truncate font-medium">{bet.username}</span>
			<span className="w-28 truncate text-muted-foreground">
				{bet.gameName}
			</span>
			<span className="w-20 text-right tabular-nums">
				{bet.betAmount.toFixed(2)}
			</span>
			<span className="w-16 text-right tabular-nums">
				{bet.multiplier.toFixed(2)}x
			</span>
			<span
				className={cn(
					"w-20 text-right font-medium tabular-nums",
					bet.isWin ? "text-green-500" : "text-red-500",
				)}
			>
				{bet.isWin ? "+" : "-"}
				{bet.payout.toFixed(2)}
			</span>
		</div>
	);
}
