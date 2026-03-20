import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { LoginRequest, RegisterRequest, AuthResponse } from "../types";
import type { ApiResponse } from "@/types/api.types";
import type { User } from "@/types/user.types";
import { DUMMY_USER, DUMMY_AUTH_RESPONSE } from "@/temp_data";

export async function login(data: LoginRequest): Promise<AuthResponse> {
	try {
		const res = await apiClient.post<ApiResponse<AuthResponse>>(
			ENDPOINTS.AUTH.LOGIN,
			data,
		);
		return res.data.data;
	} catch {
		return DUMMY_AUTH_RESPONSE;
	}
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
	try {
		const res = await apiClient.post<ApiResponse<AuthResponse>>(
			ENDPOINTS.AUTH.REGISTER,
			data,
		);
		return res.data.data;
	} catch {
		return DUMMY_AUTH_RESPONSE;
	}
}

export async function logout(): Promise<void> {
	try {
		await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
	} catch {
		// silently ignore — no backend
	}
}

export async function refreshToken(): Promise<{ token: string }> {
	try {
		const res = await apiClient.post<ApiResponse<{ token: string }>>(
			ENDPOINTS.AUTH.REFRESH,
		);
		return res.data.data;
	} catch {
		return { token: "dummy-jwt-token-for-dev" };
	}
}

export async function getMe(): Promise<User> {
	try {
		const res = await apiClient.get<ApiResponse<User>>(ENDPOINTS.AUTH.ME);
		return res.data.data;
	} catch {
		return DUMMY_USER;
	}
}
