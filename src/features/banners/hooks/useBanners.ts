"use client";

import { useBannersQuery } from "../queries/banners.queries";

/**
 * Business-logic hook for banners.
 * Currently a thin wrapper — extend with placement filtering,
 * impression tracking, etc.
 */
export function useBanners() {
	return useBannersQuery();
}
