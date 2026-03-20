/**
 * Global Application Configuration
 *
 * Single source of truth for all app-wide constants.
 * Change values here to propagate across the entire application.
 *
 * DO NOT hardcode app name, localStorage keys, store names, URLs,
 * or any other cross-cutting constants elsewhere — import from here.
 */

export const APP_CONFIG = {
	/** Application identity */
	name: "XONE",
	title: "XONE Casino",
	description: "The ultimate online casino experience",
	creator: "XONE Team",

	/** SEO metadata defaults */
	meta: {
		titleTemplate: "%s | XONE Casino",
		ogImage: "/images/og-default.png",
	},

	/** External URLs */
	urls: {
		site: process.env.NEXT_PUBLIC_SITE_URL ?? "https://xone.casino",
		api: process.env.NEXT_PUBLIC_API_URL ?? "/api",
		socket: process.env.NEXT_PUBLIC_SOCKET_URL ?? "",
	},

	/** Social media links */
	socials: {
		twitter: "https://twitter.com/xone_casino",
		discord: "https://discord.gg/xone",
		telegram: "https://t.me/xone_casino",
	},

	/** localStorage / sessionStorage key names */
	storageKeys: {
		authToken: "xone-auth-token",
	},

	/** Zustand store persistence keys */
	storeKeys: {
		auth: "xone-auth",
		wallet: "xone-wallet",
		app: "xone-app-store",
	},

	/** API client settings */
	api: {
		timeout: 15_000,
	},

	/** Web3 / blockchain settings */
	web3: {
		walletConnectProjectId:
			process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? "",
	},
} as const;

export type AppConfig = typeof APP_CONFIG;
