import { io, type Socket } from "socket.io-client";
import { APP_CONFIG } from "@/config/app.config";

let betsSocket: Socket | null = null;

export function getBetsSocket(): Socket {
	if (!betsSocket) {
		betsSocket = io(`${APP_CONFIG.urls.socket}/bets`, {
			autoConnect: false,
			transports: ["websocket"],
			withCredentials: true,
		});
	}
	return betsSocket;
}

export function connectBetsSocket(): void {
	const socket = getBetsSocket();
	if (!socket.connected) {
		socket.connect();
	}
}

export function disconnectBetsSocket(): void {
	betsSocket?.disconnect();
}
