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
				title: "Home",
				href: "/",
				icon: IMAGES.leftSideBarIcons.home,
			},
			{
				title: "Games",
				href: "/games",
				icon: IMAGES.common.diamond,
			},
			{
				title: "Promotions",
				href: "/promotions",
				icon: IMAGES.leftSideBarIcons.promotions,
			},
			{
				title: "My Account",
				href: "/profile",
				icon: IMAGES.leftSideBarIcons.user,
			},
			{
				title: "Deposit",
				href: "/deposit",
				icon: IMAGES.leftSideBarIcons.deposit,
			},
			{
				title: "Withdrawal",
				href: "/withdrawal",
				icon: IMAGES.leftSideBarIcons.withdraw,
			},
			{
				title: "Support",
				href: "/support",
				icon: IMAGES.leftSideBarIcons.support,
			},
		],
	},
	{
		items: [
			{
				title: "VIP Club",
				href: "/vip-club",
				icon: IMAGES.leftSideBarIcons.vip,
			},
			{
				title: "Ranks",
				href: "/ranks",
				icon: IMAGES.leftSideBarIcons.rank,
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
	title: "Settings",
	href: "/settings",
	icon: IMAGES.common.gear,
};

/** Social links with icons */
export const socialLinks = [
	{
		title: "Discord",
		href: "https://discord.gg/xone",
		icon: IMAGES.socials.variant1.discord,
	},
	{
		title: "Facebook",
		href: "https://facebook.com/xone",
		icon: IMAGES.socials.variant1.facebook,
	},
	{
		title: "Telegram",
		href: "https://t.me/xone_casino",
		icon: IMAGES.socials.variant1.telegram,
	},
	{
		title: "Instagram",
		href: "https://instagram.com/xone",
		icon: IMAGES.socials.variant1.instagram,
	},
	{
		title: "YouTube",
		href: "https://youtube.com/xone",
		icon: IMAGES.socials.variant1.youtube,
	},
] as const;

export const userNavItems: NavItem[] = [
	{
		title: "Profile",
		href: "/profile",
		icon: IMAGES.leftSideBarIcons.user,
	},
];

export const adminNavItems: NavItem[] = [
	{
		title: "Dashboard",
		href: "/admin",
		icon: "layout-dashboard",
		roles: ["admin"],
	},
	{ title: "Users", href: "/admin/users", icon: "users", roles: ["admin"] },
	{ title: "Blog", href: "/admin/blog", icon: "file-text", roles: ["admin"] },
	{ title: "Tags", href: "/admin/tags", icon: "tag", roles: ["admin"] },
	{ title: "SEO", href: "/admin/seo", icon: "search", roles: ["admin"] },
	{
		title: "Settings",
		href: "/admin/settings",
		icon: "settings",
		roles: ["admin"],
	},
];

export const legalNavItems: NavItem[] = [
	{ title: "Privacy Policy", href: "/privacy-policy" },
	{ title: "Terms & Conditions", href: "/terms-and-conditions" },
	{ title: "Responsible Gambling", href: "/responsible-gambling" },
];

/** Footer link group structure */
export interface FooterLinkGroup {
	title: string;
	links: { title: string; href: string }[];
}

/** Footer navigation link groups — matches Figma footer layout */
export const footerLinkGroups: FooterLinkGroup[] = [
	{
		title: "Platform",
		links: [
			{ title: "Casino", href: "/games" },
			{ title: "Loyalty Program", href: "/vip-club" },
			{ title: "Refer a friend", href: "/affiliate" },
			{ title: "Partnership Program", href: "/affiliate" },
		],
	},
	{
		title: "About Us",
		links: [
			{ title: "News", href: "/news" },
			{ title: "Work with us", href: "/careers" },
			{ title: "Bonus Terms/program", href: "/promotions" },
			{ title: "Gitbook / white-paper", href: "/whitepaper" },
		],
	},
	{
		title: "Support / Legal",
		links: [
			{ title: "Live Support", href: "/support" },
			{ title: "Privacy policy", href: "/privacy-policy" },
			{ title: "Responsible Gaming", href: "/responsible-gambling" },
			{ title: "Terms & Conditions", href: "/terms-and-conditions" },
		],
	},
];

/** Footer social links — variant-2 icons (different from sidebar) */
export const footerSocialLinks = [
	{
		title: "Twitter",
		href: "https://twitter.com/xone_casino",
		icon: IMAGES.socials.variant2.twitter,
	},
	{
		title: "Telegram",
		href: "https://t.me/xone_casino",
		icon: IMAGES.socials.variant2.telegram,
	},
	{
		title: "Discord",
		href: "https://discord.gg/xone",
		icon: IMAGES.socials.variant2.discord,
	},
	{
		title: "Instagram",
		href: "https://instagram.com/xone",
		icon: IMAGES.socials.variant2.instagram,
	},
	{
		title: "Facebook",
		href: "https://facebook.com/xone",
		icon: IMAGES.socials.variant2.facebook,
	},
] as const;

/** Crypto provider icons for footer */
export const cryptoProviderIcons = [
	{ alt: "Bitcoin", src: IMAGES.logos.group238 },
	{ alt: "Ethereum", src: IMAGES.logos.group239 },
	{ alt: "Stablecoin", src: IMAGES.logos.subtract },
	{ alt: "Dogecoin", src: IMAGES.logos.group },
	{ alt: "BNB", src: IMAGES.logos.binancedex },
	{ alt: "USDT", src: IMAGES.logos.group226 },
] as const;

/** Payment provider icons for footer */
export const paymentProviderIcons = [
	{
		alt: "Visa",
		src: IMAGES.logos.visa,
		width: 56,
		height: 18,
	},
	{
		alt: "Mastercard",
		src: IMAGES.logos.mastercard,
		width: 39,
		height: 24,
	},
	{
		alt: "Apple Pay",
		src: IMAGES.logos.applePay,
		width: 58,
		height: 24,
	},
	{
		alt: "Google Pay",
		src: IMAGES.logos.googlePay,
		width: 57,
		height: 23,
	},
] as const;
