import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types/api.types";
import type { Notification } from "../types";
import { DUMMY_NOTIFICATIONS } from "@/temp_data";

export const notificationsService = {
	async list(): Promise<Notification[]> {
		try {
			const { data } = await apiClient.get<ApiResponse<Notification[]>>(
				ENDPOINTS.NOTIFICATIONS.LIST,
			);
			return data.data;
		} catch {
			return DUMMY_NOTIFICATIONS;
		}
	},

	async markRead(id: string): Promise<void> {
		try {
			await apiClient.patch(ENDPOINTS.NOTIFICATIONS.MARK_READ(id));
		} catch {
			// silently ignore — no backend
		}
	},

	async markAllRead(): Promise<void> {
		try {
			await apiClient.patch(ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ);
		} catch {
			// silently ignore — no backend
		}
	},
};
