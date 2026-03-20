import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { Profile, BetHistoryEntry, TransactionEntry } from "../types";
import { DUMMY_PROFILE, DUMMY_BET_HISTORY } from "@/temp_data";

export const profileService = {
	async me(): Promise<Profile> {
		try {
			const { data } = await apiClient.get<ApiResponse<Profile>>(
				ENDPOINTS.PROFILE.ME,
			);
			return data.data;
		} catch {
			return DUMMY_PROFILE;
		}
	},

	async byUsername(username: string): Promise<Profile> {
		try {
			const { data } = await apiClient.get<ApiResponse<Profile>>(
				ENDPOINTS.PROFILE.BY_USERNAME(username),
			);
			return data.data;
		} catch {
			return { ...DUMMY_PROFILE, username };
		}
	},

	async update(
		payload: Partial<Pick<Profile, "displayName" | "bio">>,
	): Promise<Profile> {
		try {
			const { data } = await apiClient.patch<ApiResponse<Profile>>(
				ENDPOINTS.PROFILE.UPDATE,
				payload,
			);
			return data.data;
		} catch {
			return { ...DUMMY_PROFILE, ...payload };
		}
	},

	async uploadAvatar(file: File): Promise<string> {
		try {
			const formData = new FormData();
			formData.append("avatar", file);
			const { data } = await apiClient.post<ApiResponse<{ url: string }>>(
				ENDPOINTS.PROFILE.AVATAR,
				formData,
				{
					headers: { "Content-Type": "multipart/form-data" },
				},
			);
			return data.data.url;
		} catch {
			return "";
		}
	},

	async betHistory(page = 1): Promise<PaginatedResponse<BetHistoryEntry>> {
		try {
			const { data } = await apiClient.get<
				PaginatedResponse<BetHistoryEntry>
			>(ENDPOINTS.PROFILE.BET_HISTORY, {
				params: { page },
			});
			return data;
		} catch {
			return DUMMY_BET_HISTORY(page);
		}
	},
};
