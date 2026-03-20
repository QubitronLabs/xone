import { io, type Socket } from "socket.io-client";
import { APP_CONFIG } from "@/config/app.config";

let chatSocket: Socket | null = null;

export function getChatSocket(): Socket {
	if (!chatSocket) {
		chatSocket = io(`${APP_CONFIG.urls.socket}/chat`, {
			autoConnect: false,
			transports: ["websocket"],
			withCredentials: true,
		});
	}
	return chatSocket;
}

export function connectChatSocket(token?: string): void {
	const socket = getChatSocket();
	if (token) {
		socket.auth = { token };
	}
	if (!socket.connected) {
		socket.connect();
	}
}

export function disconnectChatSocket(): void {
	chatSocket?.disconnect();
}
