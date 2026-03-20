"use client";

import { getChatSocket } from "@/lib/sockets/chat.socket";
import { useChatStore } from "../store/chat.slice";
import type { ChatMessage } from "../types";
import { useEffect, useCallback } from "react";

export function useLiveChat(roomId: string | null) {
	const { messages, addMessage, setMessages, setRoom, clearMessages } =
		useChatStore();

	useEffect(() => {
		if (!roomId) return;

		const socket = getChatSocket();
		setRoom(roomId);
		socket.emit("join-room", roomId);

		const handleMessage = (msg: ChatMessage) => addMessage(msg);
		const handleHistory = (history: ChatMessage[]) => setMessages(history);

		socket.on("message", handleMessage);
		socket.on("history", handleHistory);

		return () => {
			socket.emit("leave-room", roomId);
			socket.off("message", handleMessage);
			socket.off("history", handleHistory);
			clearMessages();
		};
	}, [roomId, addMessage, setMessages, setRoom, clearMessages]);

	const sendMessage = useCallback(
		(content: string) => {
			if (!roomId || !content.trim()) return;
			const socket = getChatSocket();
			socket.emit("message", { roomId, content: content.trim() });
		},
		[roomId],
	);

	return { messages, sendMessage };
}
