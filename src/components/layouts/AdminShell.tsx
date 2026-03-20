import type { ReactNode } from "react";
import { APP_CONFIG } from "@/config/app.config";

interface AdminShellProps {
	children: ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
	return (
		<div className="flex ">
			<aside className="hidden w-64 border-r border-border bg-sidebar md:block">
				<div className="flex h-14 items-center border-b border-border px-6">
					<span className="text-[clamp(16px,1rem+0.2vw,18px)] font-bold text-primary">
						{APP_CONFIG.name} Admin
					</span>
				</div>
				<nav className="p-4">
					{/* Admin nav items will be rendered here */}
				</nav>
			</aside>
			<div className="flex flex-1 flex-col">
				<header className="flex h-14 items-center border-b border-border bg-background px-6">
					<span className="text-[clamp(13px,0.8rem+0.1vw,14px)] text-muted-foreground">
						Administration Panel
					</span>
				</header>
				<main className="flex-1 overflow-y-auto p-6">{children}</main>
			</div>
		</div>
	);
}
