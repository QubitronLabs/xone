import { queryOptions, type UseMutationOptions } from "@tanstack/react-query";
import { useQuery, useMutation } from "@tanstack/react-query";
import * as authService from "../services/auth.service";
import type { LoginRequest, RegisterRequest, AuthResponse } from "../types";
import type { User } from "@/types/user.types";

export const authKeys = {
	all: ["auth"] as const,
	me: () => [...authKeys.all, "me"] as const,
};

export const authQueries = {
	me: () =>
		queryOptions({
			queryKey: authKeys.me(),
			queryFn: () => authService.getMe(),
		}),
};

export function useCurrentUserQuery() {
	return useQuery(authQueries.me());
}

export function useLoginMutation(
	options?: Omit<
		UseMutationOptions<AuthResponse, Error, LoginRequest>,
		"mutationFn"
	>,
) {
	return useMutation({
		mutationFn: (data: LoginRequest) => authService.login(data),
		...options,
	});
}

export function useRegisterMutation(
	options?: Omit<
		UseMutationOptions<AuthResponse, Error, RegisterRequest>,
		"mutationFn"
	>,
) {
	return useMutation({
		mutationFn: (data: RegisterRequest) => authService.register(data),
		...options,
	});
}

export function useLogoutMutation(
	options?: Omit<UseMutationOptions<void, Error, void>, "mutationFn">,
) {
	return useMutation({
		mutationFn: () => authService.logout(),
		...options,
	});
}

export function useRefreshTokenMutation() {
	return useMutation({
		mutationFn: () => authService.refreshToken(),
	});
}
