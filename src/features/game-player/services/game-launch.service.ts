import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types/api.types";
import type { GameSession } from "../types";

export const gameLaunchService = {
	async launch(
		gameId: string,
		mode: "real" | "demo" = "real",
	): Promise<GameSession> {
		try {
			const { data } = await apiClient.post<ApiResponse<GameSession>>(
				ENDPOINTS.GAMES.LAUNCH(gameId),
				{ mode },
			);
			return data.data;
		} catch {
			return {
				id: `session-dummy-${Date.now()}`,
				gameId,
				launchUrl: `about:blank#demo-${gameId}`,
				token: "dummy-session-token",
				mode,
				expiresAt: new Date(Date.now() + 3600000).toISOString(),
			};
		}
	},
};
