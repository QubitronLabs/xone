import type { User } from "@/types/user.types";
import type { AuthResponse } from "@/features/auth/types";

export const DUMMY_USER: User = {
	id: "user-001",
	username: "CryptoWhale",
	email: "cryptowhale@xone.gg",
	avatar: undefined,
	role: "user",
	isVerified: true,
	createdAt: "2024-06-15T10:00:00Z",
	updatedAt: "2025-01-10T14:30:00Z",
};

export const DUMMY_AUTH_RESPONSE: AuthResponse = {
	user: DUMMY_USER,
	session: {
		user: DUMMY_USER,
		token: "dummy-jwt-token-for-dev",
		refreshToken: "dummy-refresh-token-for-dev",
		expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
	},
};
