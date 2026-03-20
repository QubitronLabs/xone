"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GameCarouselCard, GameCarouselCardSkeleton } from "./GameCarouselCard";
import type { Game } from "../types";
import { HOMEPAGE_GAMES_PER_SECTION } from "@/config/games.config";

interface GameCarouselSectionProps {
	title: string;
	games: Game[];
	isLoading?: boolean;
	totalCount?: number;
	viewAllHref?: string;
	onPlay?: (game: Game) => void;
}

export function GameCarouselSection({
	title,
	games,
	isLoading,
	totalCount,
	viewAllHref,
	onPlay,
}: GameCarouselSectionProps) {
	const scrollRef = useRef<HTMLDivElement>(null);

	const scroll = useCallback((direction: "left" | "right") => {
		if (!scrollRef.current) return;
		const amount = 200;
		scrollRef.current.scrollBy({
			left: direction === "left" ? -amount : amount,
			behavior: "smooth",
		});
	}, []);

	return (
		<section>
			{/* Header */}
			<div className="mb-4 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<h2
						className="system-text-gradient text-xl font-bold md:text-2xl"
						style={{
							fontFamily: "var(--font-system-logo)",
						}}
					>
						{title}
					</h2>
					{viewAllHref && (
						<Link
							href={viewAllHref}
							className="text-sm font-medium text-system-muted transition-colors hover:text-system-text"
						>
							View All
						</Link>
					)}
					{totalCount != null && totalCount > 0 && (
						<span
							className="rounded-system-full px-2.5 py-0.5 text-xs font-semibold text-system-white"
							style={{
								background: "var(--gradient-system-primary)",
							}}
						>
							{totalCount}
						</span>
					)}
				</div>

				{/* Navigation arrows */}
				<div className="flex items-center gap-2">
					<Button
						variant="ghost"
						size="icon-sm"
						onClick={() => scroll("left")}
						className="rounded-full text-system-muted hover:text-system-white"
						aria-label="Scroll left"
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M15 18l-6-6 6-6"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</Button>
					<Button
						variant="ghost"
						size="icon-sm"
						onClick={() => scroll("right")}
						className="rounded-full text-system-white"
						style={{
							background: "var(--gradient-system-primary)",
						}}
						aria-label="Scroll right"
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M9 18l6-6-6-6"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</Button>
				</div>
			</div>

			{/* Cards */}
			<div
				ref={scrollRef}
				className={cn(
					"flex gap-4 overflow-x-auto pb-2 scrollbar-none",
					"snap-x snap-mandatory scroll-pl-0",
				)}
			>
				{isLoading
					? Array.from({ length: HOMEPAGE_GAMES_PER_SECTION }).map(
							(_, i) => <GameCarouselCardSkeleton key={i} />,
						)
					: games.map((game) => (
							<div key={game.id} className="snap-start">
								<GameCarouselCard
									game={game}
									onPlay={onPlay}
								/>
							</div>
						))}
			</div>
		</section>
	);
}
