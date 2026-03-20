"use client";

import { useEffect } from "react";
import { getNotificationsSocket } from "@/lib/sockets/notifications.socket";
import { useNotificationsStore } from "../store/notifications.slice";
import {
	useNotificationsListQuery,
	useMarkReadMutation,
	useMarkAllReadMutation,
} from "../queries/notifications.queries";
import type { Notification } from "../types";

/**
 * Business-logic hook for notifications.
 * Composes REST queries + socket events + zustand store.
 */
export function useNotifications() {
	const {
		notifications,
		unreadCount,
		addNotification,
		setNotifications,
		markRead,
		markAllRead,
	} = useNotificationsStore();

	const { data } = useNotificationsListQuery();
	const markReadMutation = useMarkReadMutation();
	const markAllReadMutation = useMarkAllReadMutation();

	useEffect(() => {
		if (data) setNotifications(data);
	}, [data, setNotifications]);

	useEffect(() => {
		const socket = getNotificationsSocket();
		const handleNew = (n: Notification) => addNotification(n);
		socket.on("notification", handleNew);
		return () => {
			socket.off("notification", handleNew);
		};
	}, [addNotification]);

	return {
		notifications,
		unreadCount,
		markRead: (id: string) => {
			markRead(id);
			markReadMutation.mutate(id);
		},
		markAllRead: () => {
			markAllRead();
			markAllReadMutation.mutate();
		},
	};
}
