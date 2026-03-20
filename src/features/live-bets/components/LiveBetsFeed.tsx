"use client";

import { useTranslations } from "next-intl";
import { BetRow } from "./BetRow";
import { useLiveBets } from "../hooks/useLiveBets";

export function LiveBetsFeed() {
	const t = useTranslations("bets");
	const tCommon = useTranslations("common");
	const { bets } = useLiveBets();

	return (
		<div className="overflow-hidden rounded-xl border border-border bg-card">
			<div className="flex items-center border-b border-border px-4 py-3">
				<h3 className="text-sm font-semibold">{t("title")}</h3>
				<span className="ml-2 rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] font-bold text-green-500 uppercase">
					{tCommon("live")}
				</span>
			</div>
			<div className="max-h-[400px] overflow-y-auto">
				<div className="flex items-center gap-3 border-b border-border bg-muted/30 px-4 py-1.5 text-xs font-medium text-muted-foreground">
					<span className="w-24">{t("player")}</span>
					<span className="w-28">{t("game")}</span>
					<span className="w-20 text-right">{t("bet")}</span>
					<span className="w-16 text-right">{t("multi")}</span>
					<span className="w-20 text-right">{t("payout")}</span>
				</div>
				{bets.map((bet) => (
					<BetRow key={bet.id} bet={bet} />
				))}
			</div>
		</div>
	);
}
