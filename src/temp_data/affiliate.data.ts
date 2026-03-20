import type {
	AffiliateStats,
	Referral,
	AffiliateRate,
} from "@/features/affiliate/types";
import type { PaginatedResponse } from "@/types/api.types";

export const DUMMY_AFFILIATE_STATS: AffiliateStats = {
	totalReferrals: 47,
	activeReferrals: 32,
	totalEarnings: 4850.75,
	pendingEarnings: 320.0,
	referralCode: "XONE-CW2024",
	referralLink: "https://xone.gg/ref/XONE-CW2024",
};

const REFERRAL_NAMES = [
	"LuckyAce",
	"SpinKing",
	"NightOwl",
	"CryptoFox",
	"DiamondHands",
	"SlotMaster",
	"GoldenBear",
	"SilverWolf",
	"ThunderBolt",
	"MoonShot",
	"RocketMan",
	"StarDust",
	"IceBreaker",
	"FireStorm",
	"DarkKnight",
];

export function DUMMY_REFERRALS(page: number): PaginatedResponse<Referral> {
	const pageSize = 10;
	const total = 47;
	const totalPages = Math.ceil(total / pageSize);
	const count =
		page <= totalPages
			? Math.min(pageSize, total - (page - 1) * pageSize)
			: 0;

	const data: Referral[] = Array.from({ length: count }, (_, i) => {
		const idx = (page - 1) * pageSize + i;
		return {
			id: `ref-${idx + 1}`,
			username:
				REFERRAL_NAMES[idx % REFERRAL_NAMES.length] +
				(idx >= REFERRAL_NAMES.length ? idx : ""),
			joinedAt: new Date(Date.now() - idx * 86400000 * 3).toISOString(),
			totalWagered: Math.round((500 + idx * 230) * 100) / 100,
			commission: Math.round((25 + idx * 11.5) * 100) / 100,
			isActive: idx % 4 !== 0,
		};
	});

	return {
		data,
		total,
		page,
		pageSize,
		totalPages,
		hasMore: page < totalPages,
		nextPage: page < totalPages ? page + 1 : null,
	};
}

export const DUMMY_AFFILIATE_RATES: AffiliateRate[] = [
	{ tier: "Bronze", minReferrals: 0, commissionRate: 5 },
	{ tier: "Silver", minReferrals: 10, commissionRate: 10 },
	{ tier: "Gold", minReferrals: 25, commissionRate: 15 },
	{ tier: "Platinum", minReferrals: 50, commissionRate: 20 },
	{ tier: "Diamond", minReferrals: 100, commissionRate: 25 },
];
