"use client";

import { useState } from "react";
import { useGameLaunchMutation } from "../queries/game-player.queries";
import type { GameSession } from "../types";

/**
 * Business-logic hook for game sessions.
 * Manages session state and composes the launch mutation.
 */
export function useGameSession() {
	const [session, setSession] = useState<GameSession | null>(null);
	const launchMutation = useGameLaunchMutation();

	const launch = (gameId: string, mode: "real" | "demo" = "real") => {
		launchMutation.mutate(
			{ gameId, mode },
			{
				onSuccess: (data) => setSession(data),
			},
		);
	};

	const endSession = () => setSession(null);

	return {
		session,
		launch,
		endSession,
		isLaunching: launchMutation.isPending,
		launchError: launchMutation.error,
	};
}
