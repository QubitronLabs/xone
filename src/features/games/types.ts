export interface Game {
	id: string;
	name: string;
	slug: string;
	thumbnail: string;
	provider: string;
	providerSlug: string;
	category: string;
	tags: string[];
	rtp: number;
	isLive: boolean;
	isFavorite: boolean;
}

export interface GameCategory {
	slug: string;
	name: string;
	count: number;
}

export interface GameProvider {
	slug: string;
	name: string;
	logo: string;
	gameCount: number;
}

export interface GamesFilterParams {
	category?: string;
	provider?: string;
	search?: string;
	sort?: "popular" | "newest" | "a-z" | "z-a";
	page?: number;
	pageSize?: number;
}
