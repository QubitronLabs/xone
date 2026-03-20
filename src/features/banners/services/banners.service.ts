import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types/api.types";
import type { Banner } from "../types";
import { DUMMY_BANNERS } from "@/temp_data";

export const bannersService = {
	async active(): Promise<Banner[]> {
		try {
			const { data } = await apiClient.get<ApiResponse<Banner[]>>(
				ENDPOINTS.BANNERS.ACTIVE,
			);
			return data.data;
		} catch {
			return DUMMY_BANNERS;
		}
	},
};
