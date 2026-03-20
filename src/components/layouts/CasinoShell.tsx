"use client";

import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileBottomNav } from "./MobileBottomNav";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SidebarProfileCard } from "@/features/profile";

interface CasinoShellProps {
	children: ReactNode;
}

export function CasinoShell({ children }: CasinoShellProps) {
	return (
		<SidebarProvider
			defaultOpen={true}
			style={
				{
					"--sidebar-width": "clamp(240px, 18vw, 320px)",
				} as React.CSSProperties
			}
		>
			<Sidebar />
			<SidebarInset className="min-h-svh min-w-0 bg-transparent!">
				<div className="flex flex-1 flex-col overflow-y-auto">
					<div className="flex-1 p-[clamp(16px,1.5vw,24px)]">
						{children}
					</div>
					<Footer />
					<div className="h-20 shrink-0 md:hidden" />
				</div>
			</SidebarInset>

			{/* Right sidebar — desktop only, sticky while center scrolls */}
			<aside className="hidden w-(--layout-system-right-panel) shrink-0 lg:flex">
				<div className="sticky top-0 flex h-screen w-full flex-col gap-4 overflow-y-auto p-4 pt-6">
					<SidebarProfileCard />
				</div>
			</aside>

			<MobileBottomNav />
		</SidebarProvider>
	);
}
