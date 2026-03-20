"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAppStore } from "@/store";
import { useAuthStore } from "@/features/auth/store/auth.slice";
import { useSidebar } from "@/components/ui/sidebar";
import { LanguageSelector } from "@/components/common/LanguageSelector";
import { IMAGES } from "@/config/images.config";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	SearchIcon,
	SidebarLeftIcon,
	SidebarRightIcon,
} from "@hugeicons/core-free-icons";

export function Header() {
	const t = useTranslations("header");
	const openModal = useAppStore((s) => s.openModal);
	const toggleRightSidebar = useAppStore((s) => s.toggleRightSidebar);
	const isRightSidebarOpen = useAppStore((s) => s.isRightSidebarOpen);
	const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
	const { toggleSidebar } = useSidebar();

	return (
		<header className="w-full z-30 flex h-14 shrink-0 items-center justify-between bg-system-bg/95 px-[clamp(16px,1.5vw,24px)] backdrop-blur-system-glass [font-variation-settings:var(--font-system-variation)]">
			{/* Left — X1 Logo as Sidebar Toggle (mobile only) */}
			<div className="flex items-center md:hidden">
				<button
					onClick={toggleSidebar}
					className="flex size-9 items-center justify-center rounded-system-base transition-transform duration-200 active:scale-95"
					aria-label="Toggle sidebar"
				>
					<Image
						src={IMAGES.common.logos.x1}
						alt="X1"
						width={32}
						height={32}
						className="size-8"
					/>
				</button>
			</div>

			{/* Right — Actions */}
			<div className="ml-auto flex items-center gap-2.5">
				<button
					onClick={() => openModal("search")}
					className="flex size-9 items-center justify-center rounded-system-base text-system-muted transition-colors duration-200 hover:bg-white/5 hover:text-system-text"
					aria-label={t("searchPlaceholder")}
				>
					<HugeiconsIcon
						icon={SearchIcon}
						className="size-5"
						strokeWidth={1.5}
					/>
				</button>

				<LanguageSelector />

				{/* Right sidebar toggle — visible only between lg and xl */}
				<button
					onClick={toggleRightSidebar}
					className="hidden size-9 items-center justify-center rounded-system-base text-system-muted transition-colors duration-200 hover:bg-white/5 hover:text-system-text lg:flex xl:hidden"
					aria-label="Toggle right sidebar"
				>
					<HugeiconsIcon
						icon={
							isRightSidebarOpen
								? SidebarRightIcon
								: SidebarLeftIcon
						}
						className="size-5"
						strokeWidth={1.5}
					/>
				</button>

				{isAuthenticated && (
					<button
						onClick={() => openModal("wallet")}
						className="rounded-system-2xl px-4 py-2 text-sm font-medium text-white shadow-system-base transition-all duration-200 hover:brightness-110 bg-(image:--gradient-system-brand-button)"
					>
						{t("wallet")}
					</button>
				)}
			</div>
		</header>
	);
}
