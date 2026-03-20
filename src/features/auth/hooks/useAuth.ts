"use client";

import { useAuthStore } from "../store/auth.slice";
import {
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
} from "../queries/auth.queries";
import type { LoginRequest, RegisterRequest } from "../types";
import { APP_CONFIG } from "@/config/app.config";

/**
 * Business-logic hook for authentication.
 * Composes TanStack mutations with zustand auth store.
 */
export function useAuth() {
	const { setAuth, clearAuth, isAuthenticated, user } = useAuthStore();

	const loginMutation = useLoginMutation({
		onSuccess: (result) => {
			setAuth(result.user, result.session.token);
			if (typeof window !== "undefined") {
				localStorage.setItem(
					APP_CONFIG.storageKeys.authToken,
					result.session.token,
				);
			}
		},
	});

	const registerMutation = useRegisterMutation({
		onSuccess: (result) => {
			setAuth(result.user, result.session.token);
			if (typeof window !== "undefined") {
				localStorage.setItem(
					APP_CONFIG.storageKeys.authToken,
					result.session.token,
				);
			}
		},
	});

	const logoutMutation = useLogoutMutation({
		onSuccess: () => {
			clearAuth();
			if (typeof window !== "undefined") {
				localStorage.removeItem(APP_CONFIG.storageKeys.authToken);
			}
		},
	});

	return {
		user,
		isAuthenticated,
		login: loginMutation.mutate,
		register: registerMutation.mutate,
		logout: logoutMutation.mutate,
		isLoggingIn: loginMutation.isPending,
		isRegistering: registerMutation.isPending,
		loginError: loginMutation.error,
		registerError: registerMutation.error,
	};
}
