import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { APP_CONFIG } from "@/config/app.config";

export const apiClient = axios.create({
	baseURL: APP_CONFIG.urls.api,
	timeout: APP_CONFIG.api.timeout,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

// ── Request Interceptor ──────────────────────────────────────────────
apiClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token =
			typeof window !== "undefined"
				? localStorage.getItem(APP_CONFIG.storageKeys.authToken)
				: null;

		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error: AxiosError) => Promise.reject(error),
);

// ── Response Interceptor ─────────────────────────────────────────────
apiClient.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & {
			_retry?: boolean;
		};

		// Handle 401 — attempt token refresh once
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const { data } = await axios.post<{ token: string }>(
					`${APP_CONFIG.urls.api}/auth/refresh`,
					{},
					{ withCredentials: true },
				);

				if (typeof window !== "undefined") {
					localStorage.setItem(
						APP_CONFIG.storageKeys.authToken,
						data.token,
					);
				}

				if (originalRequest.headers) {
					originalRequest.headers.Authorization = `Bearer ${data.token}`;
				}

				return apiClient(originalRequest);
			} catch {
				if (typeof window !== "undefined") {
					localStorage.removeItem(APP_CONFIG.storageKeys.authToken);
				}
				return Promise.reject(error);
			}
		}

		return Promise.reject(error);
	},
);
