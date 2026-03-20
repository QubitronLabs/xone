"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { IMAGES } from "@/config/images.config";
import { LiveProgressBorder } from "@/components/common/LiveProgressBorder";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	MoreHorizontalIcon,
	ArrowDown01Icon,
	UserIcon,
	ChartBarLineIcon,
	GiftIcon,
	PercentCircleIcon,
	Logout01Icon,
	Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const MENU_ITEMS = [
	{ label: "Profile", href: "/profile", icon: UserIcon },
	{ label: "Win / Loss", href: "/profile?tab=bets", icon: ChartBarLineIcon },
	{ label: "Referral Bonus", href: "/referral", icon: GiftIcon },
	{ label: "Turnover Bonus", href: "/turnover", icon: PercentCircleIcon },
] as const;

const WALLET_TABS = ["Wallet", "Deposit", "Withdraw", "Swap", "Tip"] as const;

function AuthenticatedCard() {
	const { user, logout } = useAuth();
	const [isExpanded, setIsExpanded] = useState(false);
	const [isWalletOpen, setIsWalletOpen] = useState(false);
	const [walletTab, setWalletTab] =
		useState<(typeof WALLET_TABS)[number]>("Wallet");

	const xpProgress = 0.75;
	const level = 14;

	return (
		<>
			<div className="relative flex w-full flex-col rounded-system-4xl bg-(image:--gradient-system-card) p-5 shadow-system-base">
				{/* Top row: Avatar + Info + Menu */}
				<div className="flex items-start gap-4">
					{/* Avatar with XP progress border */}
					<LiveProgressBorder progress={xpProgress}>
						{user?.avatar ? (
							<Image
								src={user.avatar}
								alt={user?.username ?? "User"}
								width={58}
								height={58}
								className="size-full object-cover"
							/>
						) : (
							<span className="text-xl font-semibold text-system-white bg-system-avatar-purple size-full flex items-center justify-center">
								{(user?.username ?? "U")[0]?.toUpperCase()}
							</span>
						)}
					</LiveProgressBorder>

					{/* Username + Level badge + XP */}
					<div className="flex min-w-0 flex-1 flex-col justify-center pt-1">
						<div className="flex items-center gap-2">
							<span
								className="truncate text-lg font-semibold leading-5 tracking-[1.08px] text-white"
								style={{
									fontVariationSettings:
										"var(--font-system-variation)",
								}}
							>
								{user?.username ?? "User"}
							</span>
							{/* Level badge — inline next to username */}
							<div className="flex size-5.5 shrink-0 items-center justify-center rounded-system-xs border border-white/40 bg-(image:--gradient-system-primary)">
								<span className="text-[10px] font-semibold leading-none tracking-[0.6px] text-white">
									{level}
								</span>
							</div>
						</div>
						<p
							className="mt-1.5 text-sm leading-4 text-system-muted"
							style={{
								fontVariationSettings:
									"var(--font-system-variation)",
							}}
						>
							Need Exp:{" "}
							<span className="text-system-soft">4,400</span>
						</p>
					</div>

					{/* 3-dot toggle button */}
					<button
						onClick={() => setIsExpanded((prev) => !prev)}
						className="flex size-9 shrink-0 items-center justify-center rounded-system-base border-2 border-system-border bg-(image:--gradient-system-secondary) shadow-system-base transition-opacity hover:opacity-80"
					>
						<HugeiconsIcon
							icon={MoreHorizontalIcon}
							size={18}
							className="text-system-muted"
						/>
					</button>
				</div>

				{/* Accordion menu — expands between user info and balance */}
				<div
					className="grid transition-[grid-template-rows] duration-300 ease-in-out"
					style={{
						gridTemplateRows: isExpanded ? "1fr" : "0fr",
					}}
				>
					<div className="overflow-hidden">
						<div className="flex flex-col gap-0.5 pt-4 pb-2">
							{MENU_ITEMS.map((item) => (
								<Link
									key={item.label}
									href={item.href}
									className="flex items-center gap-3 rounded-system-base px-3 py-2.5 text-sm font-medium text-system-text transition-colors hover:bg-system-overlay hover:text-white"
								>
									<HugeiconsIcon
										icon={item.icon}
										size={18}
										className="text-system-muted"
									/>
									{item.label}
								</Link>
							))}
							<button
								onClick={() => logout()}
								className="flex items-center gap-3 rounded-system-base px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
							>
								<HugeiconsIcon
									icon={Logout01Icon}
									size={18}
									className="text-red-400"
								/>
								Log Out
							</button>
						</div>
					</div>
				</div>

				{/* Balance bar */}
				<button
					onClick={() => setIsWalletOpen(true)}
					className="relative mt-4 flex h-12 w-full items-center gap-3 rounded-system-xl px-1 transition-opacity hover:opacity-90"
					style={{
						background:
							"linear-gradient(180deg, rgba(245, 166, 73, 0) -68.75%, rgba(245, 166, 73, 0.05) 100%), #14111F",
						boxShadow: "inset 0 4px 4px 0 rgba(6, 5, 10, 0.12)",
					}}
				>
					{/* Coin icon container */}
					<div className="relative flex size-10 shrink-0 items-center justify-center rounded-system-base border border-system-border-strong bg-linear-to-b from-system-accent-soft to-system-accent-soft-deep">
						<Image
							src={IMAGES.common.elements.treasury.coin}
							alt="Balance"
							width={28}
							height={28}
							className="relative size-7 object-cover"
						/>
					</div>

					{/* Balance amount */}
					<span
						className="flex-1 text-left text-lg font-medium tracking-[1.08px] system-text-gradient"
						style={{
							fontVariationSettings:
								"var(--font-system-variation)",
						}}
					>
						244.455,50
					</span>

					{/* Down chevron */}
					<HugeiconsIcon
						icon={ArrowDown01Icon}
						size={16}
						className="mr-3 shrink-0 text-system-muted"
					/>
				</button>
			</div>

			{/* Wallet modal — global centered dialog */}
			<Dialog open={isWalletOpen} onOpenChange={setIsWalletOpen}>
				<DialogContent className="max-w-md rounded-system-2xl border border-system-border-strong bg-(image:--gradient-system-card) p-0 shadow-xl">
					<DialogTitle className="sr-only">Wallet</DialogTitle>
					{/* Tab bar */}
					<div className="flex gap-1 rounded-t-system-2xl bg-system-overlay p-2">
						{WALLET_TABS.map((tab) => (
							<button
								key={tab}
								onClick={() => setWalletTab(tab)}
								className={`flex-1 rounded-system-sm px-2 py-2.5 text-sm font-medium transition-colors ${
									walletTab === tab
										? "bg-(image:--gradient-system-primary) text-white shadow-system-glow"
										: "text-system-muted hover:text-system-text"
								}`}
							>
								{tab}
							</button>
						))}
					</div>

					{/* Placeholder content */}
					<div className="flex h-64 items-center justify-center p-6">
						<div className="flex flex-col items-center gap-3 text-system-muted">
							<HugeiconsIcon icon={Wallet01Icon} size={32} />
							<span className="text-sm font-medium">
								{walletTab} content
							</span>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}

function UnauthenticatedCard() {
	const openModal = useAppStore((s) => s.openModal);

	return (
		<div className="relative flex w-full flex-col items-center gap-4 overflow-hidden rounded-system-4xl bg-(image:--gradient-system-card) p-5 shadow-system-base">
			{/* Action buttons — side by side */}
			<div className="flex w-full gap-2.5">
				<Button
					onClick={() => openModal("register")}
					className="h-11 flex-1 rounded-system-xl bg-(image:--gradient-system-primary) text-sm font-semibold tracking-[0.72px] text-white shadow-system-glow hover:opacity-90"
				>
					Register
				</Button>
				<Button
					variant="outline"
					onClick={() => openModal("login")}
					className="h-11 flex-1 rounded-system-xl border-2 border-system-border bg-transparent text-sm font-semibold tracking-[0.72px] text-system-text hover:bg-system-overlay hover:text-white"
				>
					Sign In
				</Button>
			</div>

			{/* Divider */}
			<div className="flex w-full items-center gap-3">
				<div className="h-px flex-1 bg-system-divider" />
				<span className="text-xs font-medium text-system-muted">
					or continue with
				</span>
				<div className="h-px flex-1 bg-system-divider" />
			</div>

			{/* Web3 wallet buttons */}
			<div className="flex gap-3">
				<button
					className="flex size-11 items-center justify-center rounded-full border border-system-border-strong bg-system-overlay transition-colors hover:bg-system-overlay-mid"
					aria-label="Connect Solana wallet"
				>
					<span className="text-xs font-bold text-system-muted">
						SOL
					</span>
				</button>
				<button
					className="flex size-11 items-center justify-center rounded-full border border-system-border-strong bg-system-overlay transition-colors hover:bg-system-overlay-mid"
					aria-label="Connect Ethereum wallet"
				>
					<span className="text-xs font-bold text-system-muted">
						ETH
					</span>
				</button>
				<button
					className="flex size-11 items-center justify-center rounded-full border border-system-border-strong bg-system-overlay transition-colors hover:bg-system-overlay-mid"
					aria-label="Connect Tron wallet"
				>
					<span className="text-xs font-bold text-system-muted">
						TRX
					</span>
				</button>
			</div>
		</div>
	);
}

export function SidebarProfileCard() {
	const isAuthenticated = useAuth().isAuthenticated;

	return !isAuthenticated ? <AuthenticatedCard /> : <UnauthenticatedCard />;
}
