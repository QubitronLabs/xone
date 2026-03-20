"use client";

import {
	useGamesListQuery,
	useInfiniteGamesQuery,
	useGameDetailQuery,
	useGameCategoriesQuery,
	useGameProvidersQuery,
	useGamesByProviderQuery,
} from "../queries/games.queries";
import type { GamesFilterParams } from "../types";

/**
 * Business-logic hooks for games.
 * Currently thin wrappers — extend with UI state,
 * filtering logic, favorites, etc.
 */

export function useGames(params?: GamesFilterParams) {
	return useGamesListQuery(params);
}

export function useInfiniteGames(params?: GamesFilterParams) {
	return useInfiniteGamesQuery(params);
}

export function useGameDetail(id: string) {
	return useGameDetailQuery(id);
}

export function useGameCategories() {
	return useGameCategoriesQuery();
}

export function useGameProviders() {
	return useGameProvidersQuery();
}

export function useGamesByProvider(
	provider: string,
	params?: GamesFilterParams,
) {
	return useGamesByProviderQuery(provider, params);
}
