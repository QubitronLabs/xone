export interface Profile {
	id: string;
	username: string;
	email: string;
	avatar?: string;
	displayName?: string;
	bio?: string;
	level: number;
	xp: number;
	joinedAt: string;
	totalBets: number;
	totalWagered: number;
	favoriteGame?: string;
}

export interface BetHistoryEntry {
	id: string;
	gameName: string;
	gameSlug: string;
	betAmount: number;
	currency: string;
	multiplier: number;
	payout: number;
	isWin: boolean;
	timestamp: string;
}

export interface TransactionEntry {
	id: string;
	type: "deposit" | "withdraw" | "bonus" | "tip-sent" | "tip-received";
	amount: number;
	currency: string;
	status: "pending" | "completed" | "failed";
	timestamp: string;
	txHash?: string;
}
