"use client";

import type { GamesFilterParams } from "../types";

interface GameFiltersProps {
	filters: GamesFilterParams;
	onFilterChange: (filters: GamesFilterParams) => void;
	categories?: { slug: string; name: string }[];
	providers?: { slug: string; name: string }[];
}

export function GameFilters({
	filters,
	onFilterChange,
	categories = [],
	providers = [],
}: GameFiltersProps) {
	return (
		<div className="flex flex-wrap gap-2">
			<select
				value={filters.category ?? ""}
				onChange={(e) =>
					onFilterChange({
						...filters,
						category: e.target.value || undefined,
						page: 1,
					})
				}
				className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
			>
				<option value="">All Categories</option>
				{categories.map((cat) => (
					<option key={cat.slug} value={cat.slug}>
						{cat.name}
					</option>
				))}
			</select>

			<select
				value={filters.provider ?? ""}
				onChange={(e) =>
					onFilterChange({
						...filters,
						provider: e.target.value || undefined,
						page: 1,
					})
				}
				className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
			>
				<option value="">All Providers</option>
				{providers.map((p) => (
					<option key={p.slug} value={p.slug}>
						{p.name}
					</option>
				))}
			</select>

			<select
				value={filters.sort ?? "popular"}
				onChange={(e) =>
					onFilterChange({
						...filters,
						sort: e.target.value as GamesFilterParams["sort"],
					})
				}
				className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
			>
				<option value="popular">Popular</option>
				<option value="newest">Newest</option>
				<option value="a-z">A–Z</option>
				<option value="z-a">Z–A</option>
			</select>
		</div>
	);
}
