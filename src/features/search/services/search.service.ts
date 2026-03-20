import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types/api.types";
import type { Game } from "@/features/games/types";
import { DUMMY_SEARCH_RESULTS } from "@/temp_data";

export const searchService = {
	async searchGames(query: string): Promise<Game[]> {
		try {
			const { data } = await apiClient.get<ApiResponse<Game[]>>(
				ENDPOINTS.SEARCH.GAMES,
				{
					params: { q: query },
				},
			);
			return data.data;
		} catch {
			return DUMMY_SEARCH_RESULTS(query);
		}
	},
};
