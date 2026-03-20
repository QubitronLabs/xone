"use client";

import { useSearchGamesQuery } from "../queries/search.queries";
import { useDebouncedValue } from "./useDebouncedSearch";

/**
 * Business-logic hook for search.
 * Composes debounce + the query hook.
 */
export function useSearch(query: string) {
	const debouncedQuery = useDebouncedValue(query, 300);
	return useSearchGamesQuery(debouncedQuery);
}
