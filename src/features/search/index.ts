export { SearchModal } from "./components/SearchModal";
export { SearchResults } from "./components/SearchResults";
// Business-logic hooks
export { useSearch } from "./hooks/useSearch";
export { useDebouncedValue } from "./hooks/useDebouncedSearch";
// TanStack Query wrappers
export {
	searchKeys,
	searchQueries,
	useSearchGamesQuery,
} from "./queries/search.queries";
