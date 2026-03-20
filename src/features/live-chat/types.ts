export interface ChatMessage {
	id: string;
	userId: string;
	username: string;
	avatar?: string;
	content: string;
	timestamp: string;
	role: "user" | "moderator" | "admin" | "vip";
	isMuted?: boolean;
}

export interface ChatRoom {
	id: string;
	name: string;
	locale: string;
	userCount: number;
}
