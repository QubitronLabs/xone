"use client";

import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileBottomNav } from "./MobileBottomNav";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SidebarProfileCard } from "@/features/profile";
import { useAppStore } from "@/store";
import { useIsMobile } from "@/hooks/use-mobile";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

interface CasinoShellProps {
	children: ReactNode;
}

export function CasinoShell({ children }: CasinoShellProps) {
	const isRightSidebarOpen = useAppStore((s) => s.isRightSidebarOpen);
	const toggleRightSidebar = useAppStore((s) => s.toggleRightSidebar);
	const isMobile = useIsMobile();

	return (
		<SidebarProvider
			defaultOpen={true}
			className="min-h-0! h-svh overflow-hidden"
			style={
				{
					"--sidebar-width": "clamp(240px, 18vw, 320px)",
				} as React.CSSProperties
			}
		>
			<Sidebar />
			<SidebarInset className="relative min-h-0 min-w-0 overflow-hidden bg-transparent!">
				<Header />
				<div className="flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto scroll-smooth system-scrollbar-none">
					<div className="flex-1 p-[clamp(16px,1.5vw,24px)]">
						{children}
					</div>
					<Footer />
					<div className="h-20 shrink-0 md:hidden" />
				</div>

				{/* Backdrop overlay — lg→xl only (hidden on mobile, mobile uses fullscreen) */}
				<div
					className={`absolute inset-0 z-40 bg-black/50 transition-opacity duration-300 ease-in-out hidden md:block xl:hidden ${
						isRightSidebarOpen
							? "md:opacity-100"
							: "pointer-events-none md:opacity-0"
					}`}
					onClick={toggleRightSidebar}
				/>

				{/* Right sidebar overlay — lg→xl with smooth slide transition (hidden on mobile) */}
				<aside
					className={`absolute top-0 right-0 z-50 hidden h-full w-[clamp(280px,20vw,360px)] transition-transform duration-300 ease-in-out md:flex xl:hidden ${
						isRightSidebarOpen
							? "translate-x-0"
							: "translate-x-full"
					}`}
				>
					<div className="flex h-full w-full flex-col rounded-l-2xl bg-(image:--gradient-system-sidebar-bg) shadow-2xl [font-variation-settings:var(--font-system-variation)]">
						{/* Close button */}
						<div className="flex items-center justify-end px-4 pt-4">
							<button
								onClick={toggleRightSidebar}
								className="flex size-8 items-center justify-center rounded-system-base text-system-muted transition-colors duration-200 hover:bg-white/10 hover:text-system-text"
								aria-label="Close sidebar"
							>
								<HugeiconsIcon
									icon={Cancel01Icon}
									className="size-5"
									strokeWidth={1.5}
								/>
							</button>
						</div>
						<div className="flex flex-1 flex-col gap-4 overflow-y-auto system-scrollbar-none p-4 pt-2">
							<SidebarProfileCard />
						</div>
					</div>
				</aside>
			</SidebarInset>

			{/* Right sidebar — xl+: always visible (in-flow), matching left sidebar style */}
			<aside className="hidden w-[clamp(280px,20vw,360px)] shrink-0 py-2 xl:flex">
				<div className="flex h-full w-full flex-col rounded-2xl bg-(image:--gradient-system-sidebar-bg) [font-variation-settings:var(--font-system-variation)]">
					<div className="flex flex-1 flex-col gap-4 overflow-y-auto system-scrollbar-none p-4 pt-6">
						<SidebarProfileCard />
					</div>
				</div>
			</aside>

			{/* Mobile fullscreen right sidebar — z-[90] so bottom nav (z-[100]) stays on top */}
			{isMobile && (
				<div
					className={`fixed inset-0 z-90 flex flex-col bg-(image:--gradient-system-sidebar-bg) transition-transform duration-300 ease-in-out md:hidden [font-variation-settings:var(--font-system-variation)] ${
						isRightSidebarOpen
							? "translate-x-0"
							: "translate-x-full"
					}`}
				>
					{/* Header */}
					<div className="flex h-14 shrink-0 items-center justify-between px-4">
						<span className="text-base font-semibold text-system-text">
							Chat
						</span>
						<button
							onClick={toggleRightSidebar}
							className="flex size-8 items-center justify-center rounded-system-base text-system-muted transition-colors duration-200 hover:bg-white/10 hover:text-system-text"
							aria-label="Close sidebar"
						>
							<HugeiconsIcon
								icon={Cancel01Icon}
								className="size-5"
								strokeWidth={1.5}
							/>
						</button>
					</div>
					{/* Content */}
					<div className="flex flex-1 flex-col gap-4 overflow-y-auto system-scrollbar-none p-4 pt-0 pb-20">
						<SidebarProfileCard />
					</div>
				</div>
			)}

			<MobileBottomNav />
		</SidebarProvider>
	);
}
