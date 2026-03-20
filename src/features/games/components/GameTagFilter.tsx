"use client";

import { cn } from "@/lib/utils";
import { useQueryParam } from "@/hooks/use-query-param";
import { gameTags, type GameTagSlug } from "@/config/games.config";

export function GameTagFilter() {
	const [activeTag, setActiveTag] = useQueryParam("tag", "all");

	return (
		<div className="flex flex-wrap items-center gap-2">
			{gameTags.map((tag) => {
				const isActive = activeTag === tag.slug;
				return (
					<button
						key={tag.slug}
						type="button"
						onClick={() => setActiveTag(tag.slug)}
						className={cn(
							"rounded-system-full px-4 py-1.5 text-sm font-medium transition-all",
							isActive
								? "text-system-white shadow-system-glow"
								: "text-system-dim hover:text-system-text",
						)}
						style={
							isActive
								? {
										background:
											"var(--gradient-system-primary)",
									}
								: undefined
						}
					>
						{tag.label}
					</button>
				);
			})}
		</div>
	);
}
