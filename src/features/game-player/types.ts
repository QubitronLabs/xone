export interface GameSession {
	id: string;
	gameId: string;
	launchUrl: string;
	token: string;
	mode: "real" | "demo";
	expiresAt: string;
}
