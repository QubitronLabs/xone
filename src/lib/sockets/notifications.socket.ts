import { io, type Socket } from "socket.io-client";
import { APP_CONFIG } from "@/config/app.config";

let notificationsSocket: Socket | null = null;

export function getNotificationsSocket(): Socket {
	if (!notificationsSocket) {
		notificationsSocket = io(`${APP_CONFIG.urls.socket}/notifications`, {
			autoConnect: false,
			transports: ["websocket"],
			withCredentials: true,
		});
	}
	return notificationsSocket;
}

export function connectNotificationsSocket(token: string): void {
	const socket = getNotificationsSocket();
	socket.auth = { token };
	if (!socket.connected) {
		socket.connect();
	}
}

export function disconnectNotificationsSocket(): void {
	notificationsSocket?.disconnect();
}
