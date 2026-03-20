import type { StateCreator } from "zustand";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { User } from "@/types/user.types";
import { APP_CONFIG } from "@/config/app.config";

export interface AuthSlice {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	setAuth: (user: User, token: string) => void;
	clearAuth: () => void;
	setUser: (user: User) => void;
}

const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (set) => ({
	user: null,
	token: null,
	isAuthenticated: false,
	setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
	clearAuth: () => set({ user: null, token: null, isAuthenticated: false }),
	setUser: (user) => set({ user }),
});

export const useAuthStore = create<AuthSlice>()(
	devtools(
		persist(createAuthSlice, {
			name: APP_CONFIG.storeKeys.auth,
			partialize: (state) => ({ token: state.token }),
		}),
		{ name: "auth-store" },
	),
);
