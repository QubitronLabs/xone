"use client";

import { useGamesListQuery } from "../queries/games.queries";
import { HOMEPAGE_GAMES_PER_SECTION } from "@/config/games.config";

export function useHomepageGames() {
	const homeGamesQuery = useGamesListQuery({
		sort: "popular",
		pageSize: HOMEPAGE_GAMES_PER_SECTION,
	});

	const popularGamesQuery = useGamesListQuery({
		sort: "newest",
		pageSize: HOMEPAGE_GAMES_PER_SECTION,
	});

	const bonusGamesQuery = useGamesListQuery({
		category: "slots",
		pageSize: HOMEPAGE_GAMES_PER_SECTION,
	});

	return {
		homeGames: homeGamesQuery.data?.data ?? [],
		homeGamesTotal: homeGamesQuery.data?.total ?? 0,
		popularGames: popularGamesQuery.data?.data ?? [],
		popularGamesTotal: popularGamesQuery.data?.total ?? 0,
		bonusGames: bonusGamesQuery.data?.data ?? [],
		bonusGamesTotal: bonusGamesQuery.data?.total ?? 0,
		isLoading:
			homeGamesQuery.isLoading ||
			popularGamesQuery.isLoading ||
			bonusGamesQuery.isLoading,
	};
}
