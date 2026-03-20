import { queryOptions } from "@tanstack/react-query";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsService } from "../services/notifications.service";

export const notificationKeys = {
	all: ["notifications"] as const,
	list: () => [...notificationKeys.all, "list"] as const,
};

export const notificationQueries = {
	list: () =>
		queryOptions({
			queryKey: notificationKeys.list(),
			queryFn: () => notificationsService.list(),
		}),
};

export function useNotificationsListQuery() {
	return useQuery(notificationQueries.list());
}

export function useMarkReadMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => notificationsService.markRead(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: notificationKeys.list(),
			});
		},
	});
}

export function useMarkAllReadMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => notificationsService.markAllRead(),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: notificationKeys.list(),
			});
		},
	});
}
