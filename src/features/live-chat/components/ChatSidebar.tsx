"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { useLiveChat } from "../hooks/useLiveChat";
import { useChatStore } from "../store/chat.slice";
import type { ChatMessage as ChatMessageType } from "../types";

export function ChatSidebar() {
	const t = useTranslations("chat");
	const { isOpen, setOpen, roomId } = useChatStore();
	const { messages, sendMessage } = useLiveChat(roomId);
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [messages]);

	if (!isOpen) return null;

	return (
		<aside className="flex h-full w-80 flex-col border-l border-border bg-card">
			<div className="flex items-center justify-between border-b border-border px-4 py-3">
				<h3 className="text-sm font-semibold">{t("title")}</h3>
				<button
					type="button"
					onClick={() => setOpen(false)}
					className="text-muted-foreground hover:text-foreground"
				>
					&times;
				</button>
			</div>

			<div ref={scrollRef} className="flex-1 overflow-y-auto py-2">
				{messages.map((msg: ChatMessageType) => (
					<ChatMessage key={msg.id} message={msg} />
				))}
			</div>

			<ChatInput onSend={sendMessage} />
		</aside>
	);
}
