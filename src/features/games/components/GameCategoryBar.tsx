"use client";

import { cn } from "@/lib/utils";
import { useQueryParam } from "@/hooks/use-query-param";
import { gameCategories, type GameCategorySlug } from "@/config/games.config";
import { ScrollArea } from "@/components/ui/scroll-area";

export function GameCategoryBar() {
	const [activeCategory, setActiveCategory] = useQueryParam(
		"category",
		"all",
	);

	return (
		<div
			className="system-glass relative overflow-hidden"
			style={{
				boxShadow:
					"var(--shadow-system-inner-panel), var(--shadow-system-base)",
			}}
		>
			<ScrollArea className="w-full">
				<div className="flex items-center gap-1 p-2">
					{gameCategories.map((cat) => {
						const isActive = activeCategory === cat.slug;
						return (
							<button
								key={cat.slug}
								type="button"
								onClick={() => setActiveCategory(cat.slug)}
								className={cn(
									"flex shrink-0 items-center gap-2 rounded-system-xl px-4 py-2.5 text-sm font-medium transition-all",
									isActive
										? "text-system-white shadow-system-glow"
										: "text-system-muted hover:text-system-text",
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
								<span>{cat.label}</span>
							</button>
						);
					})}
				</div>
			</ScrollArea>
		</div>
	);
}
