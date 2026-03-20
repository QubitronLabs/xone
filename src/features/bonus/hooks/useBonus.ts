"use client";

import {
	useBonusListQuery,
	useBonusRatesQuery,
	useClaimBonusMutation,
} from "../queries/bonus.queries";

/**
 * Business-logic hooks for bonuses.
 * Currently thin wrappers — extend with claim validation,
 * wagering calculation, etc.
 */

export function useBonusList() {
	return useBonusListQuery();
}

export function useBonusRates() {
	return useBonusRatesQuery();
}

export function useClaimBonus() {
	return useClaimBonusMutation();
}
