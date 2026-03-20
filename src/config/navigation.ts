import { IMAGES } from "@/config/images.config";

export interface NavItem {
	title: string;
	href: string;
	icon?: string;
	badge?: string;
	children?: NavItem[];
	roles?: ("user" | "moderator" | "admin")[];
}

export interface NavGroup {
	label?: string;
	items: NavItem[];
}

/** Primary navigation groups — matches Figma sidebar layout */
export const sidebarNavGroups: NavGroup[] = [
	{
		items: [
			{
				title: "home",
				href: "/",
				icon: IMAGES.common.leftSideBarIcons.home,
			},
			{
				title: "games",
				href: "/games",
				icon: IMAGES.common.icons.diamond,
			},
			{
				title: "promotions",
				href: "/promotions",
				icon: IMAGES.common.leftSideBarIcons.promotions,
			},
			{
				title: "myAccount",
				href: "/profile",
				icon: IMAGES.common.leftSideBarIcons.user,
			},
			{
				title: "deposit",
				href: "/deposit",
				icon: IMAGES.common.leftSideBarIcons.deposit,
			},
			{
				title: "withdrawal",
				href: "/withdrawal",
				icon: IMAGES.common.leftSideBarIcons.withdraw,
			},
			{
				title: "support",
				href: "/support",
				icon: IMAGES.common.leftSideBarIcons.support,
			},
		],
	},
	{
		items: [
			{
				title: "vipClub",
				href: "/vip-club",
				icon: IMAGES.common.leftSideBarIcons.vip,
			},
			{
				title: "ranks",
				href: "/ranks",
				icon: IMAGES.common.leftSideBarIcons.rank,
			},
		],
	},
];

/** Flat list of all main nav items (for compatibility) */
export const mainNavItems: NavItem[] = sidebarNavGroups.flatMap(
	(group) => group.items,
);

/** Settings nav item */
export const settingsNavItem: NavItem = {
	title: "settings",
	href: "/settings",
	icon: IMAGES.common.icons.gear,
};

/** Social links with icons */
export const socialLinks = [
	{
		title: "Discord",
		href: "https://discord.gg/xone",
		icon: IMAGES.common.socials.variant1.discord,
	},
	{
		title: "Facebook",
		href: "https://facebook.com/xone",
		icon: IMAGES.common.socials.variant1.facebook,
	},
	{
		title: "Telegram",
		href: "https://t.me/xone_casino",
		icon: IMAGES.common.socials.variant1.telegram,
	},
	{
		title: "Instagram",
		href: "https://instagram.com/xone",
		icon: IMAGES.common.socials.variant1.instagram,
	},
	{
		title: "YouTube",
		href: "https://youtube.com/xone",
		icon: IMAGES.common.socials.variant1.youtube,
	},
] as const;

export const userNavItems: NavItem[] = [
	{
		title: "profile",
		href: "/profile",
		icon: IMAGES.common.leftSideBarIcons.user,
	},
];

export const adminNavItems: NavItem[] = [
	{
		title: "dashboard",
		href: "/admin",
		icon: "layout-dashboard",
		roles: ["admin"],
	},
	{ title: "users", href: "/admin/users", icon: "users", roles: ["admin"] },
	{ title: "blog", href: "/admin/blog", icon: "file-text", roles: ["admin"] },
	{ title: "tags", href: "/admin/tags", icon: "tag", roles: ["admin"] },
	{ title: "seo", href: "/admin/seo", icon: "search", roles: ["admin"] },
	{
		title: "settings",
		href: "/admin/settings",
		icon: "settings",
		roles: ["admin"],
	},
];

export const legalNavItems: NavItem[] = [
	{ title: "privacyPolicy", href: "/privacy-policy" },
	{ title: "termsConditions", href: "/terms-and-conditions" },
	{ title: "responsibleGaming", href: "/responsible-gambling" },
];

/** Footer link group structure */
export interface FooterLinkGroup {
	title: string;
	links: { title: string; href: string }[];
}

/** Footer navigation link groups — matches Figma footer layout */
export const footerLinkGroups: FooterLinkGroup[] = [
	{
		title: "platform",
		links: [
			{ title: "casino", href: "/games" },
			{ title: "loyaltyProgram", href: "/vip-club" },
			{ title: "referAFriend", href: "/affiliate" },
			{ title: "partnershipProgram", href: "/affiliate" },
		],
	},
	{
		title: "aboutUs",
		links: [
			{ title: "news", href: "/news" },
			{ title: "workWithUs", href: "/careers" },
			{ title: "bonusTerms", href: "/promotions" },
			{ title: "gitbook", href: "/whitepaper" },
		],
	},
	{
		title: "supportLegal",
		links: [
			{ title: "liveSupport", href: "/support" },
			{ title: "privacyPolicy", href: "/privacy-policy" },
			{ title: "responsibleGaming", href: "/responsible-gambling" },
			{ title: "termsConditions", href: "/terms-and-conditions" },
		],
	},
];

/** Footer social links — variant-2 icons (different from sidebar) */
export const footerSocialLinks = [
	{
		title: "Twitter",
		href: "https://twitter.com/xone_casino",
		icon: IMAGES.common.socials.variant2.twitter,
	},
	{
		title: "Telegram",
		href: "https://t.me/xone_casino",
		icon: IMAGES.common.socials.variant2.telegram,
	},
	{
		title: "Discord",
		href: "https://discord.gg/xone",
		icon: IMAGES.common.socials.variant2.discord,
	},
	{
		title: "Instagram",
		href: "https://instagram.com/xone",
		icon: IMAGES.common.socials.variant2.instagram,
	},
	{
		title: "Facebook",
		href: "https://facebook.com/xone",
		icon: IMAGES.common.socials.variant2.facebook,
	},
] as const;

/** Crypto provider icons for footer */
export const cryptoProviderIcons = [
	{ alt: "Bitcoin", src: IMAGES.common.logos.bitcoin },
	{ alt: "Ethereum", src: IMAGES.common.logos.ethereum },
	{ alt: "Stablecoin", src: IMAGES.common.logos.stablecoin },
	{ alt: "Dogecoin", src: IMAGES.common.logos.dogecoin },
	{ alt: "BNB", src: IMAGES.common.logos.bnb },
	{ alt: "USDT", src: IMAGES.common.logos.usdt },
] as const;

/** Payment provider icons for footer */
export const paymentProviderIcons = [
	{
		alt: "Visa",
		src: IMAGES.common.logos.visa,
		width: 56,
		height: 18,
	},
	{
		alt: "Mastercard",
		src: IMAGES.common.logos.mastercard,
		width: 39,
		height: 24,
	},
	{
		alt: "Apple Pay",
		src: IMAGES.common.logos.applePay,
		width: 58,
		height: 24,
	},
	{
		alt: "Google Pay",
		src: IMAGES.common.logos.googlePay,
		width: 57,
		height: 23,
	},
] as const;
