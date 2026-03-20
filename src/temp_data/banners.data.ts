import type { Banner } from "@/features/banners/types";
import { IMAGES } from "@/config/images.config";

export const DUMMY_BANNERS: Banner[] = [
	{
		id: "banner-1",
		title: "Welcome Bonus",
		subtitle: "Get 100% up to $500 on your first deposit",
		imageUrl: IMAGES.desktop.banners.heroBanner,
		mobileImageUrl: IMAGES.mobile.banners.heroBanner,
		linkUrl: "/promotions",
		layout: "hero",
		position: 1,
		isActive: true,
	},
	{
		id: "banner-2",
		title: "Weekly Cashback",
		subtitle: "15% cashback every Monday",
		imageUrl: IMAGES.desktop.banners.heroBanner,
		mobileImageUrl: IMAGES.mobile.banners.heroBanner,
		linkUrl: "/promotions",
		layout: "hero",
		position: 2,
		isActive: true,
	},
	{
		id: "banner-3",
		title: "VIP Program",
		subtitle: "Exclusive rewards for our top players",
		imageUrl: IMAGES.desktop.banners.heroBanner,
		mobileImageUrl: IMAGES.mobile.banners.heroBanner,
		linkUrl: "/vip",
		layout: "hero",
		position: 3,
		isActive: true,
	},
	{
		id: "banner-4",
		title: "Refer & Earn",
		subtitle: "Earn 25% commission on referrals",
		imageUrl: IMAGES.desktop.banners.heroBanner,
		mobileImageUrl: IMAGES.mobile.banners.heroBanner,
		linkUrl: "/referral",
		layout: "card",
		position: 4,
		isActive: true,
	},
];
