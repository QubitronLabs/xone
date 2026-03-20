"use client";

import Image from "next/image";
import type { Game } from "@/features/games/types";

interface SearchResultsProps {
	results: Game[];
	isLoading: boolean;
	query: string;
	onSelect: (game: Game) => void;
}

export function SearchResults({
	results,
	isLoading,
	query,
	onSelect,
}: SearchResultsProps) {
	if (query.length < 2) {
		return (
			<p className="px-4 py-6 text-center text-sm text-muted-foreground">
				Type at least 2 characters to search
			</p>
		);
	}

	if (isLoading) {
		return (
			<div className="space-y-2 p-4">
				{Array.from({ length: 5 }, (_, i) => (
					<div key={i} className="flex items-center gap-3">
						<div className="h-10 w-10 animate-pulse rounded bg-muted" />
						<div className="flex-1 space-y-1">
							<div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
							<div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
						</div>
					</div>
				))}
			</div>
		);
	}

	if (results.length === 0) {
		return (
			<p className="px-4 py-6 text-center text-sm text-muted-foreground">
				No games found for &quot;{query}&quot;
			</p>
		);
	}

	return (
		<div className="max-h-[400px] overflow-y-auto">
			{results.map((game) => (
				<button
					key={game.id}
					type="button"
					onClick={() => onSelect(game)}
					className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-muted/50"
				>
					<Image
						src={game.thumbnail}
						alt={game.name}
						width={40}
						height={40}
						className="rounded object-cover"
					/>
					<div className="min-w-0 flex-1">
						<p className="truncate text-sm font-medium">
							{game.name}
						</p>
						<p className="truncate text-xs text-muted-foreground">
							{game.provider}
						</p>
					</div>
				</button>
			))}
		</div>
	);
}
