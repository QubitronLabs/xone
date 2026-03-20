import type { Bonus, BonusRate } from "@/features/bonus/types";

export const DUMMY_BONUSES: Bonus[] = [
	{
		id: "bonus-1",
		title: "Welcome Bonus",
		description:
			"Get 100% match on your first deposit up to $500. Start your journey with double the bankroll!",
		type: "deposit",
		percentage: 100,
		maxAmount: 500,
		minDeposit: 20,
		wagerRequirement: 35,
		expiresAt: new Date(Date.now() + 30 * 86400000).toISOString(),
		isActive: true,
		isClaimed: false,
	},
	{
		id: "bonus-2",
		title: "Weekly Cashback",
		description:
			"Get 15% cashback on your net losses every Monday. No wagering requirements!",
		type: "cashback",
		percentage: 15,
		maxAmount: 1000,
		minDeposit: 0,
		wagerRequirement: 0,
		expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
		isActive: true,
		isClaimed: false,
	},
	{
		id: "bonus-3",
		title: "50 Free Spins",
		description: "Claim 50 free spins on Sweet Bonanza. No deposit needed!",
		type: "free-spins",
		percentage: 0,
		maxAmount: 100,
		minDeposit: 0,
		wagerRequirement: 40,
		expiresAt: new Date(Date.now() + 3 * 86400000).toISOString(),
		isActive: true,
		isClaimed: false,
	},
	{
		id: "bonus-4",
		title: "Reload Bonus",
		description: "50% reload bonus on every deposit. Max bonus $250.",
		type: "reload",
		percentage: 50,
		maxAmount: 250,
		minDeposit: 10,
		wagerRequirement: 30,
		expiresAt: new Date(Date.now() + 14 * 86400000).toISOString(),
		isActive: true,
		isClaimed: true,
	},
];

export const DUMMY_BONUS_RATES: BonusRate[] = [
	{ game: "All Slots", category: "slots", wagerContribution: 100 },
	{ game: "Live Casino", category: "live-casino", wagerContribution: 10 },
	{ game: "Crash Games", category: "crash", wagerContribution: 50 },
	{ game: "Dice", category: "dice", wagerContribution: 50 },
	{ game: "Blackjack", category: "blackjack", wagerContribution: 5 },
	{ game: "Wheel Games", category: "wheel", wagerContribution: 30 },
	{ game: "Mines", category: "mines", wagerContribution: 50 },
];
