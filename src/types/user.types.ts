export interface User {
	id: string;
	username: string;
	email: string;
	avatar?: string;
	role: UserRole;
	isVerified: boolean;
	createdAt: string;
	updatedAt: string;
}

export type UserRole = "user" | "moderator" | "admin";

export interface Session {
	user: User;
	token: string;
	refreshToken: string;
	expiresAt: string;
}

export interface PublicProfile {
	id: string;
	username: string;
	avatar?: string;
	level: number;
	totalWagered: number;
	joinedAt: string;
}
