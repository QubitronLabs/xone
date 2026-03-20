import type { Game, GameCategory, GameProvider, GamesFilterParams } from "@/features/games/types";
import type { PaginatedResponse } from "@/types/api.types";

const PLACEHOLDER_THUMBNAIL = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' fill='%231a1625'%3E%3Crect width='300' height='400' rx='16'/%3E%3Ctext x='150' y='200' text-anchor='middle' fill='%239849f5' font-size='14' font-family='sans-serif'%3EGame%3C/text%3E%3C/svg%3E";

function makeThumbnail(name: string, hue: number): string {
	const bg = `hsl(${hue}, 40%, 12%)`;
	const fg = `hsl(${hue}, 70%, 65%)`;
	const encoded = encodeURIComponent(name);
	return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400'%3E%3Crect width='300' height='400' rx='16' fill='${encodeURIComponent(bg)}'/%3E%3Ctext x='150' y='200' text-anchor='middle' fill='${encodeURIComponent(fg)}' font-size='14' font-family='sans-serif'%3E${encoded}%3C/text%3E%3C/svg%3E`;
}

const GAME_NAMES = [
	"Sweet Bonanza", "Gates of Olympus", "Sugar Rush", "Starlight Princess",
	"Big Bass Bonanza", "The Dog House", "Wolf Gold", "Book of Dead",
	"Starburst", "Gonzos Quest", "Mega Moolah", "Thunderstruck II",
	"Reactoonz", "Fire Joker", "Dead or Alive 2", "Jammin Jars",
	"Razor Shark", "Buffalo King", "Legacy of Dead", "Rise of Merlin",
	"Eye of Horus", "Sakura Fortune", "Crystal Ball", "Immortal Romance",
	"Phoenix Reborn", "Wild West Gold", "Fruit Party", "Madame Destiny",
	"Aztec Gems", "Pirate Gold", "John Hunter", "Great Rhino",
	"Hot Fiesta", "Gems Bonanza", "Power of Thor", "Hand of Midas",
	"Might of Ra", "Emerald King", "Release the Kraken", "Wild Walker",
	"Congo Cash", "Mysterious Egypt", "Lucky Lightning", "Floating Dragon",
	"Voodoo Magic", "Wild Booster", "Bomb Bonanza", "Cash Elevator",
];

const PROVIDERS = [
	{ slug: "pragmatic-play", name: "Pragmatic Play", gameCount: 180 },
	{ slug: "netent", name: "NetEnt", gameCount: 120 },
	{ slug: "microgaming", name: "Microgaming", gameCount: 200 },
	{ slug: "play-n-go", name: "Play'n GO", gameCount: 150 },
	{ slug: "evolution", name: "Evolution", gameCount: 90 },
	{ slug: "push-gaming", name: "Push Gaming", gameCount: 60 },
	{ slug: "nolimit-city", name: "Nolimit City", gameCount: 45 },
	{ slug: "hacksaw-gaming", name: "Hacksaw Gaming", gameCount: 55 },
	{ slug: "red-tiger", name: "Red Tiger", gameCount: 100 },
	{ slug: "big-time-gaming", name: "Big Time Gaming", gameCount: 40 },
];

const CATEGORIES: GameCategory[] = [
	{ slug: "slots", name: "Slots", count: 450 },
	{ slug: "live-casino", name: "Live Casino", count: 120 },
	{ slug: "crash", name: "Crash", count: 30 },
	{ slug: "wheel", name: "Wheel", count: 15 },
	{ slug: "dice", name: "Dice", count: 20 },
	{ slug: "mines", name: "Mines", count: 10 },
	{ slug: "blackjack", name: "Black Jack", count: 45 },
];

const TAGS_POOL = ["new", "top", "hot", "megaways", "jackpot", "buy-bonus"];
const CATEGORY_POOL = ["slots", "live-casino", "crash", "wheel", "dice", "mines", "blackjack"];

function seededRandom(seed: number): () => number {
	let s = seed;
	return () => {
		s = (s * 16807) % 2147483647;
		return (s - 1) / 2147483646;
	};
}

function generateGames(count: number, offset = 0): Game[] {
	const rand = seededRandom(42 + offset);
	return Array.from({ length: count }, (_, i) => {
		const idx = (i + offset) % GAME_NAMES.length;
		const name = GAME_NAMES[idx];
		const providerIdx = Math.floor(rand() * PROVIDERS.length);
		const provider = PROVIDERS[providerIdx];
		const categoryIdx = Math.floor(rand() * CATEGORY_POOL.length);
		const tagCount = 1 + Math.floor(rand() * 3);
		const tags: string[] = [];
		for (let t = 0; t < tagCount; t++) {
			const tag = TAGS_POOL[Math.floor(rand() * TAGS_POOL.length)];
			if (!tags.includes(tag)) tags.push(tag);
		}
		const hue = (idx * 37 + providerIdx * 73) % 360;

		return {
			id: `game-${i + offset + 1}`,
			name,
			slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
			thumbnail: makeThumbnail(name, hue),
			provider: provider.name,
			providerSlug: provider.slug,
			category: CATEGORY_POOL[categoryIdx],
			tags,
			rtp: 92 + Number((rand() * 7).toFixed(2)),
			isLive: CATEGORY_POOL[categoryIdx] === "live-casino",
			isFavorite: rand() > 0.8,
		};
	});
}

const ALL_GAMES = generateGames(48);

export const DUMMY_GAMES_LIST = (params?: GamesFilterParams): PaginatedResponse<Game> => {
	let filtered = [...ALL_GAMES];

	if (params?.category && params.category !== "all") {
		filtered = filtered.filter((g) => g.category === params.category);
	}
	if (params?.provider) {
		filtered = filtered.filter((g) => g.providerSlug === params.provider);
	}
	if (params?.search) {
		const q = params.search.toLowerCase();
		filtered = filtered.filter((g) => g.name.toLowerCase().includes(q));
	}

	if (params?.sort === "a-z") filtered.sort((a, b) => a.name.localeCompare(b.name));
	else if (params?.sort === "z-a") filtered.sort((a, b) => b.name.localeCompare(a.name));
	else if (params?.sort === "newest") filtered.reverse();

	const page = params?.page ?? 1;
	const pageSize = params?.pageSize ?? 24;
	const start = (page - 1) * pageSize;
	const data = filtered.slice(start, start + pageSize);
	const totalPages = Math.ceil(filtered.length / pageSize);

	return {
		data,
		total: filtered.length,
		page,
		pageSize,
		totalPages,
		hasMore: page < totalPages,
		nextPage: page < totalPages ? page + 1 : null,
	};
};

export const DUMMY_GAME_DETAIL = (id: string): Game => {
	return ALL_GAMES.find((g) => g.id === id) ?? ALL_GAMES[0];
};

export const DUMMY_GAME_CATEGORIES: GameCategory[] = CATEGORIES;

export const DUMMY_GAME_PROVIDERS: GameProvider[] = PROVIDERS.map((p) => ({
	...p,
	logo: makeThumbnail(p.name, p.name.length * 37),
}));

export const DUMMY_GAMES_BY_PROVIDER = (
	provider: string,
	params?: GamesFilterParams,
): PaginatedResponse<Game> => {
	return DUMMY_GAMES_LIST({ ...params, provider });
};

export const DUMMY_SEARCH_RESULTS = (query: string): Game[] => {
	if (!query) return [];
	const q = query.toLowerCase();
	return ALL_GAMES.filter((g) => g.name.toLowerCase().includes(q)).slice(0, 10);
};
