import type { SEOPage } from "@/features/seo/types";
import { IMAGES } from "@/config/images.config";

const SEO_PAGES: Record<string, SEOPage> = {
	home: {
		slug: "home",
		title: "XONE Casino — Play Slots, Live Casino & Crash Games",
		description:
			"XONE is the premier crypto casino. Play slots, live casino, crash games and more with instant deposits and withdrawals.",
		content: "",
		ogImage: IMAGES.desktop.banners.heroBanner,
		canonicalUrl: "https://xone.gg",
		noIndex: false,
		schema: {
			"@context": "https://schema.org",
			"@type": "WebSite",
			name: "XONE Casino",
			url: "https://xone.gg",
		},
		updatedAt: new Date(Date.now() - 86400000).toISOString(),
	},
	slots: {
		slug: "slots",
		title: "Online Slots — Play 500+ Slot Games at XONE",
		description: "Play the best online slots from top providers.",
		content: "",
		updatedAt: new Date(Date.now() - 172800000).toISOString(),
	},
	promotions: {
		slug: "promotions",
		title: "Casino Bonuses & Promotions — XONE",
		description: "Get the best casino bonuses at XONE Casino.",
		content: "",
		updatedAt: new Date(Date.now() - 259200000).toISOString(),
	},
};

const DEFAULT_SEO: SEOPage = {
	slug: "default",
	title: "XONE Casino",
	description: "Play your favorite casino games at XONE.",
	content: "",
	updatedAt: new Date().toISOString(),
};

export const DUMMY_SEO_PAGE = (slug: string): SEOPage => {
	return SEO_PAGES[slug] ?? { ...DEFAULT_SEO, slug };
};
