"use client";

import {
	useAffiliateStatsQuery,
	useReferralsQuery,
	useAffiliateRatesQuery,
} from "../queries/affiliate.queries";

/**
 * Business-logic hooks for affiliate.
 * Currently thin wrappers — extend with link generation,
 * share logic, clipboard copy, etc.
 */

export function useAffiliateStats() {
	return useAffiliateStatsQuery();
}

export function useReferrals(page = 1) {
	return useReferralsQuery(page);
}

export function useAffiliateRates() {
	return useAffiliateRatesQuery();
}
