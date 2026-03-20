"use client";

import Image from "next/image";
import type { Banner } from "../types";
import { useBanners } from "../hooks/useBanners";

export function BannerRenderer() {
	const { data: banners = [], isLoading } = useBanners();

	if (isLoading) {
		return (
			<div className="h-48 w-full animate-pulse rounded-xl bg-muted md:h-64" />
		);
	}

	if (banners.length === 0) return null;

	const heroBanners = banners
		.filter((b) => b.layout === "hero")
		.sort((a, b) => a.position - b.position);

	if (heroBanners.length === 0) return null;

	const banner = heroBanners[0]!;

	return (
		<div className="relative h-48 w-full overflow-hidden rounded-xl md:h-64">
			<Image
				src={banner.imageUrl}
				alt={banner.title}
				fill
				priority
				sizes="100vw"
				className="object-cover"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
			<div className="absolute bottom-0 left-0 p-6">
				<h2 className="text-2xl font-bold text-white">
					{banner.title}
				</h2>
				{banner.subtitle && (
					<p className="mt-1 text-sm text-white/80">
						{banner.subtitle}
					</p>
				)}
			</div>
		</div>
	);
}
