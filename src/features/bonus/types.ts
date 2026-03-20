export interface Bonus {
	id: string;
	title: string;
	description: string;
	type: "deposit" | "no-deposit" | "cashback" | "free-spins" | "reload";
	percentage: number;
	maxAmount: number;
	minDeposit: number;
	wagerRequirement: number;
	expiresAt: string;
	isActive: boolean;
	isClaimed: boolean;
}

export interface BonusClaim {
	id: string;
	bonusId: string;
	bonusTitle: string;
	claimedAt: string;
	expiresAt: string;
	wagered: number;
	required: number;
	status: "active" | "completed" | "expired" | "forfeited";
}

export interface BonusRate {
	game: string;
	category: string;
	wagerContribution: number;
}
