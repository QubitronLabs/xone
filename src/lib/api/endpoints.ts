// ── API Endpoint Constants ─────────────────────────────────────────
// Centralized, typed constants for every backend endpoint.
// Usage: import { ENDPOINTS } from '@/lib/api/endpoints';

export const ENDPOINTS = {
	// Auth
	AUTH: {
		LOGIN: "/auth/login",
		REGISTER: "/auth/register",
		LOGOUT: "/auth/logout",
		REFRESH: "/auth/refresh",
		ME: "/auth/me",
	},

	// Games
	GAMES: {
		LIST: "/games",
		DETAIL: (id: string) => `/games/${id}` as const,
		BY_PROVIDER: (provider: string) =>
			`/games/provider/${provider}` as const,
		CATEGORIES: "/games/categories",
		LAUNCH: (id: string) => `/games/${id}/launch` as const,
	},

	// Providers
	PROVIDERS: {
		LIST: "/providers",
		DETAIL: (slug: string) => `/providers/${slug}` as const,
	},

	// Wallet
	WALLET: {
		BALANCE: "/wallet/balance",
		DEPOSIT: "/wallet/deposit",
		WITHDRAW: "/wallet/withdraw",
		SWAP: "/wallet/swap",
		TRANSACTIONS: "/wallet/transactions",
		TIP: "/wallet/tip",
	},

	// Bonus
	BONUS: {
		LIST: "/bonus",
		CLAIM: (id: string) => `/bonus/${id}/claim` as const,
		CALCULATOR: "/bonus/calculator",
		RATES: "/bonus/rates",
	},

	// Affiliate
	AFFILIATE: {
		STATS: "/affiliate/stats",
		REFERRALS: "/affiliate/referrals",
		CALCULATOR: "/affiliate/calculator",
		RATES: "/affiliate/rates",
		LINK: "/affiliate/link",
	},

	// Profile
	PROFILE: {
		ME: "/profile/me",
		BY_USERNAME: (username: string) => `/profile/${username}` as const,
		UPDATE: "/profile/me",
		AVATAR: "/profile/avatar",
		BET_HISTORY: "/profile/bet-history",
	},

	// Search
	SEARCH: {
		GAMES: "/search/games",
	},

	// Notifications
	NOTIFICATIONS: {
		LIST: "/notifications",
		MARK_READ: (id: string) => `/notifications/${id}/read` as const,
		MARK_ALL_READ: "/notifications/read-all",
	},

	// Admin
	ADMIN: {
		USERS: "/admin/users",
		BLOG: "/admin/blog",
		BLOG_DETAIL: (id: string) => `/admin/blog/${id}` as const,
		TAGS: "/admin/tags",
		SEO: "/admin/seo",
		SETTINGS: "/admin/settings",
	},

	// Banners
	BANNERS: {
		LIST: "/banners",
		ACTIVE: "/banners/active",
	},

	// SEO
	SEO: {
		PAGE: (slug: string) => `/seo/pages/${slug}` as const,
	},
} as const;
