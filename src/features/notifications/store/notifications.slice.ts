import { create } from "zustand";
import type { Notification } from "../types";

interface NotificationsState {
	notifications: Notification[];
	unreadCount: number;
	addNotification: (n: Notification) => void;
	setNotifications: (ns: Notification[]) => void;
	markRead: (id: string) => void;
	markAllRead: () => void;
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
	notifications: [],
	unreadCount: 0,
	addNotification: (n) =>
		set((s) => ({
			notifications: [n, ...s.notifications.slice(0, 49)],
			unreadCount: s.unreadCount + (n.isRead ? 0 : 1),
		})),
	setNotifications: (notifications) =>
		set({
			notifications,
			unreadCount: notifications.filter((n) => !n.isRead).length,
		}),
	markRead: (id) =>
		set((s) => {
			const updated = s.notifications.map((n) =>
				n.id === id ? { ...n, isRead: true } : n,
			);
			return {
				notifications: updated,
				unreadCount: updated.filter((n) => !n.isRead).length,
			};
		}),
	markAllRead: () =>
		set((s) => ({
			notifications: s.notifications.map((n) => ({ ...n, isRead: true })),
			unreadCount: 0,
		})),
}));
