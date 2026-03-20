"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Game } from "../types";

interface GameCarouselCardProps {
	game: Game;
	onPlay?: (game: Game) => void;
	className?: string;
}

export function GameCarouselCard({
	game,
	onPlay,
	className,
}: GameCarouselCardProps) {
	return (
		<button
			type="button"
			onClick={() => onPlay?.(game)}
			className={cn(
				"group relative aspect-9/11 w-45 shrink-0 overflow-hidden rounded-system-2xl transition-transform hover:scale-105",
				className,
			)}
			style={{
				background: "var(--gradient-system-card)",
			}}
		>
			<Image
				src={game.thumbnail}
				alt={game.name}
				fill
				sizes="180px"
				className="object-cover transition-transform duration-300 group-hover:scale-110"
			/>
			<div
				className="absolute inset-0"
				style={{ background: "var(--gradient-system-game-overlay)" }}
			/>
			{game.isLive && (
				<span className="absolute top-2 left-2 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
					Live
				</span>
			)}
		</button>
	);
}

export function GameCarouselCardSkeleton() {
	return (
		<div className="aspect-9/11 w-45 shrink-0 animate-pulse rounded-system-2xl bg-system-card" />
	);
}
