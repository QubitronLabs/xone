"use client";

import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { IMAGES } from "@/config/images.config";
import { useSidebar } from "@/components/ui/sidebar";

export function MobileBottomNav() {
	const pathname = usePathname();
	const { toggleSidebar } = useSidebar();

	return (
		<nav className="fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-around border-t border-system-divider bg-(image:--gradient-system-sidebar-bg) md:hidden">
			{/* Menu toggle */}
			<button
				onClick={toggleSidebar}
				className="flex flex-col items-center justify-center gap-1 p-2"
				aria-label="Toggle menu"
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					strokeLinecap="round"
					className="text-system-subtle"
				>
					<path d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>

			{/* Games */}
			<Link
				href="/games"
				className="flex flex-col items-center justify-center gap-1 p-2"
			>
				<Image
					src={IMAGES.common.diamond}
					alt="Games"
					width={24}
					height={24}
					className={`size-6 ${pathname === "/games" ? "opacity-100" : "opacity-60"}`}
				/>
			</Link>

			{/* Center X logo — home */}
			<Link
				href="/"
				className="relative -mt-4 flex size-14 items-center justify-center rounded-full bg-(image:--gradient-system-primary) shadow-system-glow"
			>
				<Image
					src={IMAGES.logos.x1}
					alt="Home"
					width={32}
					height={32}
					className="size-8 rounded-[8px]"
				/>
			</Link>

			{/* Chat */}
			<button
				className="flex flex-col items-center justify-center gap-1 p-2"
				aria-label="Chat"
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
					className="text-system-subtle"
				>
					<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
				</svg>
			</button>

			{/* Account */}
			<Link
				href="/profile"
				className="flex flex-col items-center justify-center gap-1 p-2"
			>
				<Image
					src={IMAGES.leftSideBarIcons.user}
					alt="Account"
					width={24}
					height={24}
					className={`size-6 ${pathname === "/profile" ? "opacity-100" : "opacity-60"}`}
				/>
			</Link>
		</nav>
	);
}
