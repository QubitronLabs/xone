"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useQueryParam } from "@/hooks/use-query-param";
import { useLiveBets } from "../hooks/useLiveBets";
import type { LiveBet } from "../types";

function BetsTableRow({ bet }: { bet: LiveBet }) {
	return (
		<tr className="border-b border-system-divider last:border-b-0">
			<td className="px-4 py-3">
				<span className="text-sm text-system-text">{bet.gameName}</span>
			</td>
			<td className="px-4 py-3">
				<div className="flex items-center gap-2">
					{bet.avatar && (
						<div className="size-6 overflow-hidden rounded-full bg-system-avatar-purple">
							<Image
								src={bet.avatar}
								alt=""
								width={24}
								height={24}
								className="size-full object-cover"
							/>
						</div>
					)}
					<span className="text-sm text-system-text">
						{bet.username}
					</span>
				</div>
			</td>
			<td className="px-4 py-3 text-right">
				<span className="text-sm text-system-text">
					{bet.betAmount.toFixed(2)}
				</span>
			</td>
			<td className="px-4 py-3 text-center">
				<span className="text-sm text-system-text">
					{bet.multiplier.toFixed(2)}x
				</span>
			</td>
			<td className="px-4 py-3 text-right">
				<span
					className={cn(
						"text-sm font-medium",
						bet.isWin ? "text-system-success" : "text-system-muted",
					)}
				>
					{bet.isWin ? "+" : ""}
					{bet.payout.toFixed(2)}
				</span>
			</td>
		</tr>
	);
}

export function LiveBetsTable() {
	const t = useTranslations("bets");
	const [activeTab, setActiveTab] = useQueryParam("betsTab", "latest");
	const { bets } = useLiveBets();

	const sortedBets =
		activeTab === "high-rollers"
			? [...bets].sort((a, b) => b.betAmount - a.betAmount).slice(0, 5)
			: bets.slice(0, 5);

	const tabs = [
		{ slug: "latest", label: "latestBets" },
		{ slug: "high-rollers", label: "highRollers" },
	] as const;

	return (
		<div className="overflow-hidden rounded-system-2xl bg-system-surface">
			{/* Tabs */}
			<div className="flex items-center gap-2 border-b border-system-divider px-4 py-3">
				{tabs.map((tab) => {
					const isActive = activeTab === tab.slug;
					return (
						<button
							key={tab.slug}
							type="button"
							onClick={() => setActiveTab(tab.slug)}
							className={cn(
								"rounded-system-full px-4 py-1.5 text-sm font-medium transition-all",
								isActive
									? "text-system-white shadow-system-glow"
									: "text-system-muted hover:text-system-text",
							)}
							style={
								isActive
									? {
											background:
												"var(--gradient-system-primary)",
										}
									: undefined
							}
						>
							{t(tab.label)}
						</button>
					);
				})}
			</div>

			{/* Table */}
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="border-b border-system-divider">
							<th className="px-4 py-2.5 text-left text-xs font-medium text-system-dim">
								Game
							</th>
							<th className="px-4 py-2.5 text-left text-xs font-medium text-system-dim">
								Username
							</th>
							<th className="px-4 py-2.5 text-right text-xs font-medium text-system-dim">
								Bet amount
							</th>
							<th className="px-4 py-2.5 text-center text-xs font-medium text-system-dim">
								Multiplier
							</th>
							<th className="px-4 py-2.5 text-right text-xs font-medium text-system-dim">
								Profit amount
							</th>
						</tr>
					</thead>
					<tbody>
						{sortedBets.map((bet) => (
							<BetsTableRow key={bet.id} bet={bet} />
						))}
						{sortedBets.length === 0 && (
							<tr>
								<td
									colSpan={5}
									className="px-4 py-8 text-center text-sm text-system-dim"
								>
									{t("noBetsYet")}
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
