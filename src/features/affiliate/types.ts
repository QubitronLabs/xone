export interface AffiliateStats {
	totalReferrals: number;
	activeReferrals: number;
	totalEarnings: number;
	pendingEarnings: number;
	referralCode: string;
	referralLink: string;
}

export interface Referral {
	id: string;
	username: string;
	joinedAt: string;
	totalWagered: number;
	commission: number;
	isActive: boolean;
}

export interface AffiliateRate {
	tier: string;
	minReferrals: number;
	commissionRate: number;
}

export interface EarningEntry {
	date: string;
	amount: number;
}
