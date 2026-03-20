import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types/api.types";
import type { SEOPage } from "../types";
import { DUMMY_SEO_PAGE } from "@/temp_data";

export const seoService = {
	async getPage(slug: string): Promise<SEOPage> {
		try {
			const { data } = await apiClient.get<ApiResponse<SEOPage>>(
				ENDPOINTS.SEO.PAGE(slug),
			);
			return data.data;
		} catch {
			return DUMMY_SEO_PAGE(slug);
		}
	},
};
