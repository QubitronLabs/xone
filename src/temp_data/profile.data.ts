import type { Profile, BetHistoryEntry } from "@/features/profile/types";
import type { PaginatedResponse } from "@/types/api.types";

export const DUMMY_PROFILE: Profile = {
	id: "user-001",
	username: "CryptoWhale",
	email: "cryptowhale@xone.gg",
	avatar: undefined,
	displayName: "CryptoWhale",
	bio: "High roller and crypto enthusiast",
	level: 14,
	xp: 7400,
	joinedAt: "2024-06-15T10:00:00Z",
	totalBets: 1284,
	totalWagered: 52340.5,
	favoriteGame: "Sweet Bonanza",
};

const BET_GAMES = [
	"Sweet Bonanza",
	"Gates of Olympus",
	"Sugar Rush",
	"Starlight Princess",
	"Big Bass Bonanza",
	"Wolf Gold",
	"Book of Dead",
	"Starburst",
];

function generateBetHistory(page: number): PaginatedResponse<BetHistoryEntry> {
	const pageSize = 20;
	const total = 85;
	const totalPages = Math.ceil(total / pageSize);
	const count =
		page <= totalPages
			? Math.min(pageSize, total - (page - 1) * pageSize)
			: 0;

	const data: BetHistoryEntry[] = Array.from({ length: count }, (_, i) => {
		const idx = (page - 1) * pageSize + i;
		const isWin = idx % 3 !== 0;
		const betAmount = [5, 10, 25, 50, 100, 250][idx % 6];
		const multiplier = isWin
			? [1.5, 2.0, 3.5, 5.0, 10.0, 25.0][idx % 6]
			: 0;
		const gameName = BET_GAMES[idx % BET_GAMES.length];

		return {
			id: `bet-${idx + 1}`,
			gameName,
			gameSlug: gameName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
			betAmount,
			currency: "USDT",
			multiplier,
			payout: isWin ? betAmount * multiplier : 0,
			isWin,
			timestamp: new Date(Date.now() - idx * 3600000).toISOString(),
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

export const DUMMY_BET_HISTORY = generateBetHistory;
