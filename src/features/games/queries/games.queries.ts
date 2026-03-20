import { queryOptions, infiniteQueryOptions } from "@tanstack/react-query";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { gamesService } from "../services/games.service";
import type { GamesFilterParams } from "../types";

export const gamesKeys = {
	all: ["games"] as const,
	lists: () => [...gamesKeys.all, "list"] as const,
	list: (params?: GamesFilterParams) =>
		[...gamesKeys.lists(), params] as const,
	details: () => [...gamesKeys.all, "detail"] as const,
	detail: (id: string) => [...gamesKeys.details(), id] as const,
	categories: () => [...gamesKeys.all, "categories"] as const,
	providers: () => [...gamesKeys.all, "providers"] as const,
	byProvider: (provider: string) =>
		[...gamesKeys.all, "provider", provider] as const,
};

export const gamesQueries = {
	list: (params?: GamesFilterParams) =>
		queryOptions({
			queryKey: gamesKeys.list(params),
			queryFn: () => gamesService.list(params),
		}),

	infinite: (params?: GamesFilterParams) =>
		infiniteQueryOptions({
			queryKey: gamesKeys.list(params),
			queryFn: ({ pageParam }) =>
				gamesService.list({ ...params, page: pageParam }),
			initialPageParam: 1,
			getNextPageParam: (lastPage) => lastPage.nextPage,
		}),

	detail: (id: string) =>
		queryOptions({
			queryKey: gamesKeys.detail(id),
			queryFn: () => gamesService.detail(id),
			enabled: !!id,
		}),

	categories: () =>
		queryOptions({
			queryKey: gamesKeys.categories(),
			queryFn: () => gamesService.categories(),
			staleTime: 5 * 60_000,
		}),

	providers: () =>
		queryOptions({
			queryKey: gamesKeys.providers(),
			queryFn: () => gamesService.providers(),
			staleTime: 5 * 60_000,
		}),

	byProvider: (provider: string, params?: GamesFilterParams) =>
		queryOptions({
			queryKey: [...gamesKeys.byProvider(provider), params],
			queryFn: () => gamesService.byProvider(provider, params),
			enabled: !!provider,
		}),
};

// --- Query Hooks ---

export function useGamesListQuery(params?: GamesFilterParams) {
	return useQuery(gamesQueries.list(params));
}

export function useInfiniteGamesQuery(params?: GamesFilterParams) {
	return useInfiniteQuery(gamesQueries.infinite(params));
}

export function useGameDetailQuery(id: string) {
	return useQuery(gamesQueries.detail(id));
}

export function useGameCategoriesQuery() {
	return useQuery(gamesQueries.categories());
}

export function useGameProvidersQuery() {
	return useQuery(gamesQueries.providers());
}

export function useGamesByProviderQuery(
	provider: string,
	params?: GamesFilterParams,
) {
	return useQuery(gamesQueries.byProvider(provider, params));
}
