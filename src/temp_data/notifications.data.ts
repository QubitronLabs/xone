import type { Notification } from "@/features/notifications/types";

export const DUMMY_NOTIFICATIONS: Notification[] = [
	{
		id: "notif-1",
		type: "win",
		title: "Big Win! 🎰",
		message: "You won $1,250.00 on Sweet Bonanza with a 25x multiplier!",
		isRead: false,
		createdAt: new Date(Date.now() - 1800000).toISOString(),
		actionUrl: "/profile?tab=bets",
	},
	{
		id: "notif-2",
		type: "deposit",
		title: "Deposit Confirmed",
		message: "Your deposit of 500 USDT has been confirmed successfully.",
		isRead: false,
		createdAt: new Date(Date.now() - 3600000).toISOString(),
	},
	{
		id: "notif-3",
		type: "bonus",
		title: "New Bonus Available",
		message:
			"Claim your 50% reload bonus — up to $250! Valid for 24 hours.",
		isRead: false,
		createdAt: new Date(Date.now() - 7200000).toISOString(),
		actionUrl: "/promotions",
	},
	{
		id: "notif-4",
		type: "promo",
		title: "Weekend Tournament",
		message: "Join the $10,000 weekend slots tournament. Starts Friday!",
		isRead: true,
		createdAt: new Date(Date.now() - 86400000).toISOString(),
		actionUrl: "/promotions",
	},
	{
		id: "notif-5",
		type: "system",
		title: "Account Verified",
		message: "Your identity verification has been approved.",
		isRead: true,
		createdAt: new Date(Date.now() - 172800000).toISOString(),
	},
	{
		id: "notif-6",
		type: "withdraw",
		title: "Withdrawal Processed",
		message: "Your withdrawal of 1,000 USDT has been sent to your wallet.",
		isRead: true,
		createdAt: new Date(Date.now() - 259200000).toISOString(),
	},
];
