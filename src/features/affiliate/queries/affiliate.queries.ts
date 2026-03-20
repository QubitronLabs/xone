import { queryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { affiliateService } from "../services/affiliate.service";

export const affiliateKeys = {
	all: ["affiliate"] as const,
	stats: () => [...affiliateKeys.all, "stats"] as const,
	referrals: (page: number) =>
		[...affiliateKeys.all, "referrals", page] as const,
	rates: () => [...affiliateKeys.all, "rates"] as const,
};

export const affiliateQueries = {
	stats: () =>
		queryOptions({
			queryKey: affiliateKeys.stats(),
			queryFn: () => affiliateService.stats(),
		}),
	referrals: (page = 1) =>
		queryOptions({
			queryKey: affiliateKeys.referrals(page),
			queryFn: () => affiliateService.referrals(page),
		}),
	rates: () =>
		queryOptions({
			queryKey: affiliateKeys.rates(),
			queryFn: () => affiliateService.rates(),
			staleTime: 10 * 60_000,
		}),
};

// --- Query Hooks ---

export function useAffiliateStatsQuery() {
	return useQuery(affiliateQueries.stats());
}

export function useReferralsQuery(page = 1) {
	return useQuery(affiliateQueries.referrals(page));
}

export function useAffiliateRatesQuery() {
	return useQuery(affiliateQueries.rates());
}
