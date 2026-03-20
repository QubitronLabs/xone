import type {
	AdminUser,
	BlogPost,
	Tag,
	AdminSEOPage,
} from "@/features/admin/types";
import type { PaginatedResponse } from "@/types/api.types";

const ADMIN_USERNAMES = [
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

export function DUMMY_ADMIN_USERS(page: number): PaginatedResponse<AdminUser> {
	const pageSize = 20;
	const total = 150;
	const totalPages = Math.ceil(total / pageSize);
	const count =
		page <= totalPages
			? Math.min(pageSize, total - (page - 1) * pageSize)
			: 0;

	const roles: AdminUser["role"][] = [
		"user",
		"user",
		"user",
		"vip",
		"moderator",
	];
	const statuses: AdminUser["status"][] = [
		"active",
		"active",
		"active",
		"active",
		"banned",
	];

	const data: AdminUser[] = Array.from({ length: count }, (_, i) => {
		const idx = (page - 1) * pageSize + i;
		const username =
			ADMIN_USERNAMES[idx % ADMIN_USERNAMES.length] +
			(idx >= ADMIN_USERNAMES.length ? idx : "");
		return {
			id: `user-${idx + 1}`,
			username,
			email: `${username.toLowerCase()}@example.com`,
			role: roles[idx % roles.length],
			status: statuses[idx % statuses.length],
			joinedAt: new Date(Date.now() - idx * 86400000 * 2).toISOString(),
			lastLogin: new Date(Date.now() - idx * 3600000).toISOString(),
			totalWagered: Math.round(idx * 1250.5 * 100) / 100,
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

export const DUMMY_BLOG_POSTS: BlogPost[] = [
	{
		id: "blog-1",
		title: "Top 10 Slots to Play in 2025",
		slug: "top-10-slots-2025",
		content:
			"<p>Discover the most exciting slot games that are taking the casino world by storm in 2025.</p>",
		excerpt: "Discover the most exciting slot games in 2025.",
		tags: ["slots", "guide"],
		status: "published",
		publishedAt: new Date(Date.now() - 86400000).toISOString(),
		createdAt: new Date(Date.now() - 172800000).toISOString(),
		updatedAt: new Date(Date.now() - 86400000).toISOString(),
	},
	{
		id: "blog-2",
		title: "Understanding RTP and Volatility",
		slug: "understanding-rtp-volatility",
		content:
			"<p>Learn what RTP and volatility mean and how they affect your gaming experience.</p>",
		excerpt: "Learn about RTP and volatility in casino games.",
		tags: ["education", "guide"],
		status: "published",
		publishedAt: new Date(Date.now() - 259200000).toISOString(),
		createdAt: new Date(Date.now() - 345600000).toISOString(),
		updatedAt: new Date(Date.now() - 259200000).toISOString(),
	},
	{
		id: "blog-3",
		title: "Crypto Gambling: A Beginner's Guide",
		slug: "crypto-gambling-beginners-guide",
		content:
			"<p>Everything you need to know about gambling with cryptocurrency.</p>",
		excerpt: "A comprehensive guide to crypto gambling.",
		tags: ["crypto", "guide", "beginners"],
		status: "draft",
		createdAt: new Date(Date.now() - 432000000).toISOString(),
		updatedAt: new Date(Date.now() - 432000000).toISOString(),
	},
];

export const DUMMY_TAGS: Tag[] = [
	{ id: "tag-1", name: "Slots", slug: "slots", count: 12 },
	{ id: "tag-2", name: "Guide", slug: "guide", count: 8 },
	{ id: "tag-3", name: "Crypto", slug: "crypto", count: 5 },
	{ id: "tag-4", name: "Education", slug: "education", count: 4 },
	{ id: "tag-5", name: "Beginners", slug: "beginners", count: 3 },
	{ id: "tag-6", name: "News", slug: "news", count: 7 },
	{ id: "tag-7", name: "Promotions", slug: "promotions", count: 6 },
];

export const DUMMY_ADMIN_SEO_PAGES: AdminSEOPage[] = [
	{
		id: "seo-1",
		slug: "home",
		title: "XONE Casino — Play Slots, Live Casino & Crash Games",
		description:
			"XONE is the premier crypto casino. Play slots, live casino, crash games and more with instant deposits and withdrawals.",
		content: "",
		isActive: true,
	},
	{
		id: "seo-2",
		slug: "slots",
		title: "Online Slots — Play 500+ Slot Games at XONE",
		description:
			"Play the best online slots from top providers like Pragmatic Play, NetEnt, and Microgaming.",
		content: "",
		isActive: true,
	},
	{
		id: "seo-3",
		slug: "promotions",
		title: "Casino Bonuses & Promotions — XONE",
		description:
			"Get the best casino bonuses, free spins, and promotions at XONE Casino.",
		content: "",
		isActive: true,
	},
];
