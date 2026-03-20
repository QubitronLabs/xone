export interface Notification {
	id: string;
	type: "win" | "deposit" | "withdraw" | "bonus" | "system" | "promo";
	title: string;
	message: string;
	isRead: boolean;
	createdAt: string;
	actionUrl?: string;
}
