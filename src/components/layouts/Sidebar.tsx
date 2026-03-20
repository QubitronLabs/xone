"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { IMAGES } from "@/config/images.config";
import {
	Sidebar as SidebarPrimitive,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarSeparator,
} from "@/components/ui/sidebar";
import {
	sidebarNavGroups,
	settingsNavItem,
	socialLinks,
} from "@/config/navigation";

export default function Sidebar() {
	const t = useTranslations("nav");
	const tSidebar = useTranslations("sidebar");
	const pathname = usePathname();

	return (
		<SidebarPrimitive
			variant="floating"
			collapsible="offcanvas"
			className="border-e-0! p-0! py-2!"
			style={
				{
					"--sidebar-width": "clamp(240px, 18vw, 320px)",
					"--sidebar": "transparent",
					"--sidebar-border": "transparent",
				} as React.CSSProperties
			}
		>
			<div className="flex size-full flex-col rounded-2xl bg-(image:--gradient-system-sidebar-bg) [font-variation-settings:var(--font-system-variation)]">
				{/* Logo */}
				<SidebarHeader className="px-[clamp(12px,1vw+4px,20px)] pt-4 pb-0">
					<Link href="/" className="flex items-center gap-3">
						<Image
							src={IMAGES.common.logos.x1}
							alt="X1"
							width={48}
							height={48}
						/>
					</Link>
				</SidebarHeader>

				{/* BONUS & WHEEL buttons */}
				<div className="flex gap-[clamp(8px,0.5vw+4px,12px)] px-[clamp(12px,1vw+4px,20px)] pt-5 pb-3">
					<button className="relative flex h-16 flex-1 items-center overflow-hidden rounded-[12px] shadow-system-base bg-(image:--gradient-system-surface)">
						<div className="absolute inset-0 bg-(image:--gradient-system-sidebar-bonus)" />
						<div className="relative flex w-10 items-center justify-center">
							<Image
								src={
									IMAGES.common.elements.treasury.treasureBox
								}
								alt=""
								width={40}
								height={64}
								className="h-full w-10 rounded-l-[12px] object-cover"
							/>
						</div>
						<span className="relative ml-1 text-[clamp(14px,1vw+4px,18px)] font-semibold tracking-[1.08px] system-text-gradient">
							BONUS
						</span>
					</button>
					<button className="relative flex h-16 flex-1 items-center overflow-hidden rounded-[12px] shadow-system-base bg-(image:--gradient-system-surface)">
						<div className="absolute inset-0 bg-(image:--gradient-system-sidebar-wheel)" />
						<div className="relative flex w-10 items-center justify-center">
							<Image
								src={IMAGES.common.elements.treasury.wheel}
								alt=""
								width={40}
								height={64}
								className="h-full w-10 rounded-l-[12px] object-cover"
							/>
						</div>
						<span className="relative ml-1 text-[clamp(14px,1vw+4px,18px)] font-semibold tracking-[1.08px] system-text-gradient">
							WHEEL
						</span>
					</button>
				</div>

				{/* Nav area */}
				<SidebarContent className="flex-1 overflow-y-auto px-[clamp(12px,1vw+4px,20px)] py-3">
					{/* Subtle glass container */}
					<div className="rounded-2xl bg-white/4 p-3">
						{sidebarNavGroups.map((group, groupIndex) => (
							<SidebarGroup
								key={groupIndex}
								className="px-0 py-0"
							>
								{groupIndex > 0 && (
									<SidebarSeparator className="mx-0 my-4 bg-system-divider" />
								)}
								<SidebarGroupContent>
									<SidebarMenu className="gap-2">
										{group.items.map((item) => {
											const isActive =
												pathname === item.href ||
												(item.href !== "/" &&
													pathname.startsWith(
														item.href,
													));

											return (
												<SidebarMenuItem
													key={item.href}
												>
													<SidebarMenuButton
														render={
															<Link
																href={item.href}
															/>
														}
														isActive={isActive}
														className={`group/nav relative h-12! gap-6! rounded-[12px] px-3 py-0! transition-all duration-200 ease-out active:bg-transparent! data-[active=true]:bg-transparent! ${
															isActive
																? "hover:bg-transparent!"
																: "hover:bg-white/5!"
														}`}
													>
														{isActive && (
															<>
																<div className="absolute inset-0 rounded-[12px] bg-(image:--gradient-system-sidebar-active)" />
																<div className="absolute left-0 top-0 size-12 rounded-[12px] bg-system-primary/60" />
															</>
														)}
														<Image
															src={item.icon!}
															alt=""
															width={24}
															height={24}
															className={`relative z-10 size-6 shrink-0 transition-all duration-200 ${
																isActive
																	? "brightness-150"
																	: "group-hover/nav:brightness-125"
															}`}
														/>
														<span
															className={`relative z-10 text-[clamp(14px,0.85rem+0.1vw,16px)] font-medium leading-5 whitespace-nowrap transition-colors duration-200 ${
																isActive
																	? "text-white"
																	: "text-system-subtle group-hover/nav:text-system-text"
															}`}
														>
															{t(item.title)}
														</span>
													</SidebarMenuButton>
												</SidebarMenuItem>
											);
										})}
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>
						))}
					</div>
				</SidebarContent>

				{/* Settings button */}
				<SidebarFooter className="px-[clamp(12px,1vw+4px,20px)] pb-20 pt-0 md:pb-5">
					<Link
						href={settingsNavItem.href}
						className="flex h-12 items-center justify-center gap-3 rounded-[16px] border-2 border-system-border/30 border- shadow-system-base bg-(image:--gradient-system-secondary) transition-all duration-200 hover:brightness-110"
					>
						<Image
							src={settingsNavItem.icon!}
							alt=""
							width={24}
							height={24}
							className="size-6"
						/>
						<span className="text-[clamp(14px,0.85rem+0.1vw,16px)] font-medium leading-5 text-system-subtle">
							{t(settingsNavItem.title)}
						</span>
					</Link>

					{/* Social icons */}
					<div className="mt-2 flex items-center justify-between px-0">
						{socialLinks.map((social) => (
							<a
								key={social.title}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className="flex size-11 items-center justify-center rounded-[12px] bg-white/6 transition-opacity hover:opacity-80"
								aria-label={social.title}
							>
								<Image
									src={social.icon}
									alt={social.title}
									width={24}
									height={24}
									className="size-6"
								/>
							</a>
						))}
					</div>
				</SidebarFooter>
			</div>
		</SidebarPrimitive>
	);
}
