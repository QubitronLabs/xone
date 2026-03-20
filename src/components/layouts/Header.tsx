"use client";

import { useAppStore } from "@/store";
import { useAuthStore } from "@/features/auth/store/auth.slice";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
	const openModal = useAppStore((s) => s.openModal);
	const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

	return (
		<header className="sticky top-0 w-[(100dvw-var(--sidebar-width))] z-30 flex h-[clamp(48px,3.5vw+8px,56px)] items-center justify-between border-b border-system-divider bg-system-bg/95 px-[clamp(12px,1vw+4px,16px)] backdrop-blur supports-backdrop-filter:bg-system-bg/60">
			{/* Left — Sidebar Toggle */}
			<div className="flex items-center gap-[clamp(8px,0.5vw+4px,12px)]">
				<SidebarTrigger className="text-system-subtle hover:bg-system-overlay" />
			</div>

			{/* Center — Search */}
			<button
				onClick={() => openModal("search")}
				className="mx-[clamp(8px,0.5vw+4px,16px)] flex h-9 flex-1 max-w-md items-center gap-2 rounded-full border border-system-divider bg-system-input/50 px-[clamp(8px,0.5vw+4px,16px)] text-[clamp(13px,0.8rem+0.1vw,14px)] text-system-subtle transition-colors hover:bg-system-input"
			>
				<svg
					width="16"
					height="16"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
				>
					<circle cx="11" cy="11" r="8" />
					<path strokeLinecap="round" d="m21 21-4.35-4.35" />
				</svg>
				<span>Search games…</span>
				<kbd className="ml-auto hidden rounded bg-system-overlay px-1.5 py-0.5 text-[clamp(10px,0.65rem+0.05vw,12px)] text-system-subtle md:inline-block">
					⌘K
				</kbd>
			</button>

			{/* Right — Actions */}
			<div className="flex items-center gap-[clamp(4px,0.3vw+2px,8px)]">
				{isAuthenticated ? (
					<button
						onClick={() => openModal("wallet")}
						className="rounded-full bg-system-primary px-[clamp(12px,0.8vw+4px,16px)] py-[clamp(6px,0.4vw+2px,8px)] text-[clamp(13px,0.8rem+0.1vw,14px)] font-medium text-white transition-colors hover:opacity-90"
					>
						Wallet
					</button>
				) : (
					<>
						<button
							onClick={() => openModal("login")}
							className="rounded-full border-2 border-system-border px-[clamp(12px,0.8vw+4px,16px)] py-[clamp(6px,0.4vw+2px,8px)] text-[clamp(13px,0.8rem+0.1vw,14px)] font-medium text-system-text transition-opacity hover:opacity-80 bg-(image:--gradient-system-secondary)"
						>
							Sign In
						</button>
						<button
							onClick={() => openModal("register")}
							className="rounded-full border-2 border-system-border px-[clamp(12px,0.8vw+4px,16px)] py-[clamp(6px,0.4vw+2px,8px)] text-[clamp(13px,0.8rem+0.1vw,14px)] font-medium text-white transition-opacity hover:opacity-90 bg-(image:--gradient-system-brand-button)"
						>
							Register
						</button>
					</>
				)}
			</div>
		</header>
	);
}
