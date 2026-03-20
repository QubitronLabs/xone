export const gameCategories = [
	{ slug: "all", label: "All Games" },
	{ slug: "slots", label: "Slots" },
	{ slug: "live-casino", label: "Live Casino" },
	{ slug: "crash", label: "Crash" },
	{ slug: "wheel", label: "Wheel" },
	{ slug: "dice", label: "Dice" },
	{ slug: "mines", label: "Mines" },
	{ slug: "blackjack", label: "Black Jack" },
] as const;

export type GameCategorySlug = (typeof gameCategories)[number]["slug"];

export const gameTags = [
	{ slug: "all", label: "All" },
	{ slug: "new", label: "New" },
	{ slug: "top", label: "Top" },
	{ slug: "hot", label: "Hot" },
	{ slug: "megaways", label: "Megaways" },
	{ slug: "jackpot", label: "Jackpot" },
	{ slug: "buy-bonus", label: "Buy Bonus" },
	{ slug: "recent", label: "Recent Games" },
] as const;

export type GameTagSlug = (typeof gameTags)[number]["slug"];

export const sortOptions = [
	{ value: "popular", label: "Most Popular" },
	{ value: "newest", label: "Newest" },
	{ value: "a-z", label: "A → Z" },
	{ value: "z-a", label: "Z → A" },
] as const;

export type GameSortOption = (typeof sortOptions)[number]["value"];

export const GAMES_PER_PAGE = 24;
export const HOMEPAGE_GAMES_PER_SECTION = 6;
