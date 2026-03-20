import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types/api.types";
import type { Bonus, BonusClaim, BonusRate } from "../types";
import { DUMMY_BONUSES, DUMMY_BONUS_RATES } from "@/temp_data";

export const bonusService = {
	async list(): Promise<Bonus[]> {
		try {
			const { data } = await apiClient.get<ApiResponse<Bonus[]>>(
				ENDPOINTS.BONUS.LIST,
			);
			return data.data;
		} catch {
			return DUMMY_BONUSES;
		}
	},

	async claim(bonusId: string): Promise<BonusClaim> {
		try {
			const { data } = await apiClient.post<ApiResponse<BonusClaim>>(
				ENDPOINTS.BONUS.CLAIM(bonusId),
			);
			return data.data;
		} catch {
			return {
				id: `claim-dummy-${Date.now()}`,
				bonusId,
				bonusTitle:
					DUMMY_BONUSES.find((b) => b.id === bonusId)?.title ??
					"Bonus",
				claimedAt: new Date().toISOString(),
				expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
				wagered: 0,
				required: 3500,
				status: "active",
			};
		}
	},

	async rates(): Promise<BonusRate[]> {
		try {
			const { data } = await apiClient.get<ApiResponse<BonusRate[]>>(
				ENDPOINTS.BONUS.RATES,
			);
			return data.data;
		} catch {
			return DUMMY_BONUS_RATES;
		}
	},
};
