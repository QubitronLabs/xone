import { create } from "zustand";
import type { ChatMessage } from "../types";
import { DUMMY_CHAT_MESSAGES } from "@/temp_data";

interface ChatState {
	messages: ChatMessage[];
	isOpen: boolean;
	roomId: string | null;
	addMessage: (msg: ChatMessage) => void;
	setMessages: (msgs: ChatMessage[]) => void;
	setOpen: (open: boolean) => void;
	setRoom: (roomId: string) => void;
	clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
	messages: DUMMY_CHAT_MESSAGES,
	isOpen: false,
	roomId: null,
	addMessage: (msg) =>
		set((s) => ({
			messages: [...s.messages.slice(-199), msg],
		})),
	setMessages: (messages) => set({ messages }),
	setOpen: (isOpen) => set({ isOpen }),
	setRoom: (roomId) => set({ roomId, messages: [] }),
	clearMessages: () => set({ messages: [] }),
}));
