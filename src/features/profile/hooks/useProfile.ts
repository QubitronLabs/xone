"use client";

import {
	useProfileQuery,
	usePublicProfileQuery,
	useBetHistoryQuery,
	useUpdateProfileMutation,
	useUploadAvatarMutation,
} from "../queries/profile.queries";

/**
 * Business-logic hooks for profile.
 * Currently thin wrappers — extend with form state,
 * avatar cropping, etc.
 */

export function useProfile() {
	return useProfileQuery();
}

export function usePublicProfile(username: string) {
	return usePublicProfileQuery(username);
}

export function useBetHistory(page = 1) {
	return useBetHistoryQuery(page);
}

export function useUpdateProfile() {
	return useUpdateProfileMutation();
}

export function useUploadAvatar() {
	return useUploadAvatarMutation();
}
