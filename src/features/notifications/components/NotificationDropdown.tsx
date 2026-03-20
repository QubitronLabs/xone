"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useNotifications } from "../hooks/useNotifications";

export function NotificationDropdown() {
	const t = useTranslations("notifications");
	const { notifications, markRead, markAllRead } = useNotifications();

	return (
		<div className="w-80 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
			<div className="flex items-center justify-between border-b border-border px-4 py-3">
				<h3 className="text-sm font-semibold">{t("title")}</h3>
				<button
					type="button"
					onClick={() => markAllRead()}
					className="text-xs text-primary hover:underline"
				>
					{t("markAllRead")}
				</button>
			</div>
			<div className="max-h-[400px] overflow-y-auto">
				{notifications.length === 0 ? (
					<p className="px-4 py-6 text-center text-sm text-muted-foreground">
						{t("noNotifications")}
					</p>
				) : (
					notifications.map((n) => (
						<button
							key={n.id}
							type="button"
							onClick={() => !n.isRead && markRead(n.id)}
							className={cn(
								"flex w-full flex-col gap-0.5 px-4 py-3 text-left hover:bg-muted/50",
								!n.isRead && "bg-primary/5",
							)}
						>
							<div className="flex items-center gap-2">
								{!n.isRead && (
									<span className="h-2 w-2 rounded-full bg-primary" />
								)}
								<span className="text-sm font-medium">
									{n.title}
								</span>
							</div>
							<p className="text-xs text-muted-foreground">
								{n.message}
							</p>
						</button>
					))
				)}
			</div>
		</div>
	);
}
