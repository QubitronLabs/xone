import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "../types";

interface ChatMessageProps {
	message: ChatMessageType;
}

const roleBadgeColor: Record<string, string> = {
	admin: "bg-red-500/20 text-red-400",
	moderator: "bg-blue-500/20 text-blue-400",
	vip: "bg-yellow-500/20 text-yellow-400",
};

export function ChatMessage({ message }: ChatMessageProps) {
	const badge = roleBadgeColor[message.role];

	return (
		<div className="flex gap-2 px-3 py-1 text-sm hover:bg-muted/30">
			<span className="flex items-center gap-1">
				{badge && (
					<span
						className={cn(
							"rounded px-1 py-0.5 text-[10px] font-bold uppercase",
							badge,
						)}
					>
						{message.role}
					</span>
				)}
				<span className="font-medium text-foreground">
					{message.username}
				</span>
			</span>
			<span className="text-muted-foreground">{message.content}</span>
		</div>
	);
}
