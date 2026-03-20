"use client";

import { HeroBanner } from "@/features/banners/components/HeroBanner";
import { ContentCardRow } from "@/features/banners/components/ContentCardRow";
import { GameCategoryBar } from "@/features/games/components/GameCategoryBar";
import { GameTagFilter } from "@/features/games/components/GameTagFilter";
import { ProviderSelector } from "@/features/games/components/ProviderSelector";
import { GameCarouselSection } from "@/features/games/components/GameCarouselSection";
import { useHomepageGames } from "@/features/games/hooks/useHomepageGames";
import { LiveBetsTable } from "@/features/live-bets/components/LiveBetsTable";

export function HomepageContent() {
	const {
		homeGames,
		homeGamesTotal,
		popularGames,
		popularGamesTotal,
		bonusGames,
		bonusGamesTotal,
		isLoading,
	} = useHomepageGames();

	return (
		<div className="space-y-6 md:space-y-8">
			{/* Hero Banner Carousel */}
			<HeroBanner />

			{/* Content Card Row (4 promotional cards) */}
			<ContentCardRow />

			{/* Game Category Bar */}
			<GameCategoryBar />

			{/* Sub-tags + Provider Selector */}
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<GameTagFilter />
				<ProviderSelector />
			</div>

			{/* Home Games Carousel */}
			<GameCarouselSection
				title="Home Games"
				games={homeGames}
				isLoading={isLoading}
				totalCount={homeGamesTotal}
				viewAllHref="/games?sort=popular"
			/>

			{/* Popular Games Carousel */}
			<GameCarouselSection
				title="Popular"
				games={popularGames}
				isLoading={isLoading}
				totalCount={popularGamesTotal}
				viewAllHref="/games?sort=newest"
			/>

			{/* Bonus Games Carousel */}
			<GameCarouselSection
				title="Bonus Games"
				games={bonusGames}
				isLoading={isLoading}
				totalCount={bonusGamesTotal}
				viewAllHref="/games?category=slots"
			/>

			{/* Live Bets Table */}
			<LiveBetsTable />
		</div>
	);
}
