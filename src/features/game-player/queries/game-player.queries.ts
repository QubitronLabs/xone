import { useMutation } from "@tanstack/react-query";
import { gameLaunchService } from "../services/game-launch.service";

export const gamePlayerKeys = {
	all: ["game-player"] as const,
	session: (gameId: string) =>
		[...gamePlayerKeys.all, "session", gameId] as const,
};

export function useGameLaunchMutation() {
	return useMutation({
		mutationFn: ({
			gameId,
			mode,
		}: {
			gameId: string;
			mode?: "real" | "demo";
		}) => gameLaunchService.launch(gameId, mode),
	});
}
