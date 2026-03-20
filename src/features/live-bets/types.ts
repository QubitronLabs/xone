export interface LiveBet {
	id: string;
	userId: string;
	username: string;
	avatar?: string;
	gameName: string;
	gameSlug: string;
	betAmount: number;
	currency: string;
	multiplier: number;
	payout: number;
	isWin: boolean;
	timestamp: string;
}
