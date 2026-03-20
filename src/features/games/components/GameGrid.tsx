"use client";

import { useTranslations } from "next-intl";
import { GameCard } from "./GameCard";
import { GameCardSkeleton } from "./GameCardSkeleton";
import type { Game } from "../types";

interface GameGridProps {
	games: Game[];
	isLoading?: boolean;
	skeletonCount?: number;
	onPlay?: (game: Game) => void;
}

export function GameGrid({
	games,
	isLoading,
	skeletonCount = 20,
	onPlay,
}: GameGridProps) {
	const t = useTranslations("games");

	if (isLoading) {
		return (
			<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
				{Array.from({ length: skeletonCount }, (_, i) => (
					<GameCardSkeleton key={i} />
				))}
			</div>
		);
	}

	if (games.length === 0) {
		return (
			<div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-border">
				<p className="text-muted-foreground">{t("noGamesFound")}</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
			{games.map((game) => (
				<GameCard key={game.id} game={game} onPlay={onPlay} />
			))}
		</div>
	);
}
