import { queryOptions } from "@tanstack/react-query";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bonusService } from "../services/bonus.service";

export const bonusKeys = {
	all: ["bonus"] as const,
	list: () => [...bonusKeys.all, "list"] as const,
	rates: () => [...bonusKeys.all, "rates"] as const,
};

export const bonusQueries = {
	list: () =>
		queryOptions({
			queryKey: bonusKeys.list(),
			queryFn: () => bonusService.list(),
		}),
	rates: () =>
		queryOptions({
			queryKey: bonusKeys.rates(),
			queryFn: () => bonusService.rates(),
			staleTime: 5 * 60_000,
		}),
};

// --- Query Hooks ---

export function useBonusListQuery() {
	return useQuery(bonusQueries.list());
}

export function useBonusRatesQuery() {
	return useQuery(bonusQueries.rates());
}

// --- Mutation Hooks ---

export function useClaimBonusMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (bonusId: string) => bonusService.claim(bonusId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: bonusKeys.list() });
		},
	});
}
