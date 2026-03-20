import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { AffiliateStats, Referral, AffiliateRate } from "../types";
import {
	DUMMY_AFFILIATE_STATS,
	DUMMY_REFERRALS,
	DUMMY_AFFILIATE_RATES,
} from "@/temp_data";

export const affiliateService = {
	async stats(): Promise<AffiliateStats> {
		try {
			const { data } = await apiClient.get<ApiResponse<AffiliateStats>>(
				ENDPOINTS.AFFILIATE.STATS,
			);
			return data.data;
		} catch {
			return DUMMY_AFFILIATE_STATS;
		}
	},

	async referrals(page = 1): Promise<PaginatedResponse<Referral>> {
		try {
			const { data } = await apiClient.get<PaginatedResponse<Referral>>(
				ENDPOINTS.AFFILIATE.REFERRALS,
				{
					params: { page },
				},
			);
			return data;
		} catch {
			return DUMMY_REFERRALS(page);
		}
	},

	async rates(): Promise<AffiliateRate[]> {
		try {
			const { data } = await apiClient.get<ApiResponse<AffiliateRate[]>>(
				ENDPOINTS.AFFILIATE.RATES,
			);
			return data.data;
		} catch {
			return DUMMY_AFFILIATE_RATES;
		}
	},

	async generateLink(): Promise<string> {
		try {
			const { data } = await apiClient.post<
				ApiResponse<{ link: string }>
			>(ENDPOINTS.AFFILIATE.LINK);
			return data.data.link;
		} catch {
			return DUMMY_AFFILIATE_STATS.referralLink;
		}
	},
};
