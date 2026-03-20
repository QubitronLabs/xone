import { queryOptions } from "@tanstack/react-query";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "../services/profile.service";
import type { Profile } from "../types";

export const profileKeys = {
	all: ["profile"] as const,
	me: () => [...profileKeys.all, "me"] as const,
	byUsername: (username: string) =>
		[...profileKeys.all, "user", username] as const,
	betHistory: (page: number) => [...profileKeys.all, "bets", page] as const,
};

export const profileQueries = {
	me: () =>
		queryOptions({
			queryKey: profileKeys.me(),
			queryFn: () => profileService.me(),
		}),
	byUsername: (username: string) =>
		queryOptions({
			queryKey: profileKeys.byUsername(username),
			queryFn: () => profileService.byUsername(username),
			enabled: !!username,
		}),
	betHistory: (page = 1) =>
		queryOptions({
			queryKey: profileKeys.betHistory(page),
			queryFn: () => profileService.betHistory(page),
		}),
};

// --- Query Hooks ---

export function useProfileQuery() {
	return useQuery(profileQueries.me());
}

export function usePublicProfileQuery(username: string) {
	return useQuery(profileQueries.byUsername(username));
}

export function useBetHistoryQuery(page = 1) {
	return useQuery(profileQueries.betHistory(page));
}

// --- Mutation Hooks ---

export function useUpdateProfileMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: Partial<Pick<Profile, "displayName" | "bio">>) =>
			profileService.update(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: profileKeys.me() });
		},
	});
}

export function useUploadAvatarMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (file: File) => profileService.uploadAvatar(file),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: profileKeys.me() });
		},
	});
}
