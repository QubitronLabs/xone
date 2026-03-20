import { queryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { searchService } from "../services/search.service";

export const searchKeys = {
	all: ["search"] as const,
	games: (query: string) => [...searchKeys.all, "games", query] as const,
};

export const searchQueries = {
	games: (query: string) =>
		queryOptions({
			queryKey: searchKeys.games(query),
			queryFn: () => searchService.searchGames(query),
			enabled: query.length >= 2,
			staleTime: 30_000,
		}),
};

export function useSearchGamesQuery(query: string) {
	return useQuery(searchQueries.games(query));
}
