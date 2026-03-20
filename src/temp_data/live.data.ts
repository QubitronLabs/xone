import type { LiveBet } from "@/features/live-bets/types";
import type { ChatMessage, ChatRoom } from "@/features/live-chat/types";

const USERNAMES = [
	"CryptoWhale",
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
];

const GAME_NAMES = [
	"Sweet Bonanza",
	"Gates of Olympus",
	"Sugar Rush",
	"Wolf Gold",
	"Book of Dead",
	"Starburst",
	"Big Bass Bonanza",
	"Starlight Princess",
];

export const DUMMY_LIVE_BETS: LiveBet[] = Array.from({ length: 20 }, (_, i) => {
	const isWin = i % 3 !== 0;
	const betAmount = [5, 10, 25, 50, 100, 250, 500][i % 7];
	const multiplier = isWin
		? [1.2, 2.5, 5.0, 10.0, 25.0, 50.0, 100.0][i % 7]
		: 0;

	return {
		id: `live-bet-${i + 1}`,
		userId: `user-${(i % 15) + 1}`,
		username: USERNAMES[i % USERNAMES.length],
		avatar: undefined,
		gameName: GAME_NAMES[i % GAME_NAMES.length],
		gameSlug: GAME_NAMES[i % GAME_NAMES.length]
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-"),
		betAmount,
		currency: "USDT",
		multiplier,
		payout: isWin ? betAmount * multiplier : 0,
		isWin,
		timestamp: new Date(Date.now() - i * 15000).toISOString(),
	};
});

export const DUMMY_CHAT_MESSAGES: ChatMessage[] = [
	{
		id: "msg-1",
		userId: "user-001",
		username: "CryptoWhale",
		content: "Just hit a 50x on Sweet Bonanza! 🎉",
		timestamp: new Date(Date.now() - 30000).toISOString(),
		role: "vip",
	},
	{
		id: "msg-2",
		userId: "user-002",
		username: "LuckyAce",
		content: "Nice one! What was your bet?",
		timestamp: new Date(Date.now() - 25000).toISOString(),
		role: "user",
	},
	{
		id: "msg-3",
		userId: "user-003",
		username: "SpinKing",
		content: "Gates of Olympus is on fire tonight 🔥",
		timestamp: new Date(Date.now() - 20000).toISOString(),
		role: "user",
	},
	{
		id: "msg-4",
		userId: "mod-001",
		username: "XONE_Mod",
		content: "Remember to gamble responsibly! Set your limits.",
		timestamp: new Date(Date.now() - 15000).toISOString(),
		role: "moderator",
	},
	{
		id: "msg-5",
		userId: "user-004",
		username: "NightOwl",
		content: "Anyone tried the new crash game?",
		timestamp: new Date(Date.now() - 10000).toISOString(),
		role: "user",
	},
	{
		id: "msg-6",
		userId: "user-005",
		username: "CryptoFox",
		content: "Hello everyone! First time here 👋",
		timestamp: new Date(Date.now() - 5000).toISOString(),
		role: "user",
	},
];

export const DUMMY_CHAT_ROOMS: ChatRoom[] = [
	{ id: "room-en", name: "English", locale: "en", userCount: 1245 },
	{ id: "room-es", name: "Español", locale: "es", userCount: 430 },
	{ id: "room-pt", name: "Português", locale: "pt", userCount: 310 },
	{ id: "room-de", name: "Deutsch", locale: "de", userCount: 185 },
	{ id: "room-fr", name: "Français", locale: "fr", userCount: 220 },
	{ id: "room-ru", name: "Русский", locale: "ru", userCount: 560 },
	{ id: "room-tr", name: "Türkçe", locale: "tr", userCount: 275 },
	{ id: "room-ja", name: "日本語", locale: "ja", userCount: 150 },
];
