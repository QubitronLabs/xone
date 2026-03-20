"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useBanners } from "../hooks/useBanners";
import type { Banner } from "../types";

function ContentCardSkeleton() {
	return (
		<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
			{Array.from({ length: 4 }).map((_, i) => (
				<div
					key={i}
					className="aspect-square animate-pulse rounded-system-2xl bg-system-card"
				/>
			))}
		</div>
	);
}

function ContentCard({ banner }: { banner: Banner }) {
	const Wrapper = banner.linkUrl ? "a" : "div";
	const wrapperProps = banner.linkUrl
		? { href: banner.linkUrl }
		: {};

	return (
		<Wrapper
			{...wrapperProps}
			className={cn(
				"group relative aspect-square overflow-hidden rounded-system-2xl transition-transform hover:scale-[1.02]",
			)}
		>
			<Image
				src={banner.imageUrl}
				alt={banner.title}
				fill
				sizes="(max-width: 768px) 50vw, 280px"
				className="object-cover transition-transform duration-300 group-hover:scale-105"
			/>
			<div
				className="absolute inset-0"
				style={{ background: "var(--gradient-system-game-overlay)" }}
			/>
			<div className="absolute inset-x-0 bottom-0 p-4">
				<h3 className="text-sm font-semibold text-system-white md:text-base">
					{banner.title}
				</h3>
				{banner.subtitle && (
					<p className="mt-0.5 text-xs text-system-muted line-clamp-2">
						{banner.subtitle}
					</p>
				)}
			</div>
		</Wrapper>
	);
}

export function ContentCardRow() {
	const { data: banners = [], isLoading } = useBanners();

	const cardBanners = banners
		.filter((b) => b.layout === "card" && b.isActive)
		.sort((a, b) => a.position - b.position)
		.slice(0, 4);

	if (isLoading) return <ContentCardSkeleton />;
	if (cardBanners.length === 0) return null;

	return (
		<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
			{cardBanners.map((banner) => (
				<ContentCard key={banner.id} banner={banner} />
			))}
		</div>
	);
}
