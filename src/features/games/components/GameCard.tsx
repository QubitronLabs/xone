"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Game } from "../types";

interface GameCardProps {
	game: Game;
	onPlay?: (game: Game) => void;
	className?: string;
}

export function GameCard({ game, onPlay, className }: GameCardProps) {
	return (
		<button
			type="button"
			onClick={() => onPlay?.(game)}
			className={cn(
				"group relative overflow-hidden rounded-xl border border-border/50 bg-card transition-all hover:border-primary/50 hover:shadow-lg",
				className,
			)}
		>
			<div className="relative aspect-[4/3] w-full overflow-hidden">
				<Image
					src={game.thumbnail}
					alt={game.name}
					fill
					sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
					className="object-cover transition-transform duration-300 group-hover:scale-105"
				/>
				{game.isLive && (
					<span className="absolute top-2 left-2 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
						Live
					</span>
				)}
			</div>
			<div className="p-2">
				<p className="truncate text-sm font-medium">{game.name}</p>
				<p className="truncate text-xs text-muted-foreground">
					{game.provider}
				</p>
			</div>
		</button>
	);
}
