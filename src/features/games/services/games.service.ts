import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
	Game,
	GameCategory,
	GameProvider,
	GamesFilterParams,
} from "../types";
import {
	DUMMY_GAMES_LIST,
	DUMMY_GAME_DETAIL,
	DUMMY_GAME_CATEGORIES,
	DUMMY_GAME_PROVIDERS,
	DUMMY_GAMES_BY_PROVIDER,
} from "@/temp_data";

export const gamesService = {
	async list(params?: GamesFilterParams): Promise<PaginatedResponse<Game>> {
		try {
			const { data } = await apiClient.get<PaginatedResponse<Game>>(
				ENDPOINTS.GAMES.LIST,
				{ params },
			);
			return data;
		} catch {
			return DUMMY_GAMES_LIST(params);
		}
	},

	async detail(id: string): Promise<Game> {
		try {
			const { data } = await apiClient.get<ApiResponse<Game>>(
				ENDPOINTS.GAMES.DETAIL(id),
			);
			return data.data;
		} catch {
			return DUMMY_GAME_DETAIL(id);
		}
	},

	async byProvider(
		provider: string,
		params?: GamesFilterParams,
	): Promise<PaginatedResponse<Game>> {
		try {
			const { data } = await apiClient.get<PaginatedResponse<Game>>(
				ENDPOINTS.GAMES.BY_PROVIDER(provider),
				{ params },
			);
			return data;
		} catch {
			return DUMMY_GAMES_BY_PROVIDER(provider, params);
		}
	},

	async categories(): Promise<GameCategory[]> {
		try {
			const { data } = await apiClient.get<ApiResponse<GameCategory[]>>(
				ENDPOINTS.GAMES.CATEGORIES,
			);
			return data.data;
		} catch {
			return DUMMY_GAME_CATEGORIES;
		}
	},

	async providers(): Promise<GameProvider[]> {
		try {
			const { data } = await apiClient.get<ApiResponse<GameProvider[]>>(
				ENDPOINTS.PROVIDERS.LIST,
			);
			return data.data;
		} catch {
			return DUMMY_GAME_PROVIDERS;
		}
	},
};
