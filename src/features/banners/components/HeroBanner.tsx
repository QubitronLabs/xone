"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useBanners } from "../hooks/useBanners";
import type { Banner } from "../types";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from "@/components/ui/carousel";

function HeroBannerSkeleton() {
	return (
		<div className="animate-pulse rounded-system-2xl bg-system-card aspect-1180/520 w-full" />
	);
}

function HeroBannerSlide({ banner }: { banner: Banner }) {
	return (
		<div className="relative aspect-1180/520 w-full overflow-hidden rounded-system-2xl">
			<Image
				src={banner.imageUrl}
				alt={banner.title}
				fill
				priority
				sizes="(max-width: 768px) 100vw, 1180px"
				className="object-cover"
			/>
			
			<div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
				<h2 className="system-text-gradient text-2xl md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-system-logo)" }}>
					{banner.title}
				</h2>
				{banner.subtitle && (
					<p className="mt-2 max-w-md text-sm text-system-text md:text-base">
						{banner.subtitle}
					</p>
				)}
				{banner.linkUrl && (
					<div className="mt-4">
						<a
							href={banner.linkUrl}
							className="inline-flex size-12 items-center justify-center rounded-full md:size-16"
							style={{
								background: "var(--gradient-system-primary)",
								boxShadow: "var(--shadow-system-glow)",
							}}
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								className="text-white"
							>
								<path
									d="M5 12h14m-6-6 6 6-6 6"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</a>
					</div>
				)}
			</div>
		</div>
	);
}

export function HeroBanner() {
	const { data: banners = [], isLoading } = useBanners();
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);

	const heroBanners = banners
		.filter((b) => b.layout === "hero" && b.isActive)
		.sort((a, b) => a.position - b.position);

	const onSelect = useCallback(() => {
		if (!api) return;
		setCurrent(api.selectedScrollSnap());
	}, [api]);

	useEffect(() => {
		if (!api) return;
		const handler = () => onSelect();
		handler();
		api.on("select", handler);
		return () => {
			api.off("select", handler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [api]);

	// Auto-play
	useEffect(() => {
		if (!api || heroBanners.length <= 1) return;
		const interval = setInterval(() => {
			api.scrollNext();
		}, 5000);
		return () => clearInterval(interval);
	}, [api, heroBanners.length]);

	if (isLoading) return <HeroBannerSkeleton />;
	if (heroBanners.length === 0) return null;

	return (
		<div className="relative">
			<Carousel
				setApi={setApi}
				opts={{ loop: true, align: "start" }}
				className="w-full"
			>
				<CarouselContent className="m-0">
					{heroBanners.map((banner) => (
						<CarouselItem key={banner.id} className="p-0">
							<HeroBannerSlide banner={banner} />
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>

			{heroBanners.length > 1 && (
				<div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
					{heroBanners.map((_, idx) => (
						<button
							key={idx}
							type="button"
							aria-label={`Go to slide ${idx + 1}`}
							onClick={() => api?.scrollTo(idx)}
							className={cn(
								"h-2 rounded-full transition-all",
								idx === current
									? "w-6 bg-system-primary"
									: "w-2 bg-system-white/40",
							)}
						/>
					))}
				</div>
			)}
		</div>
	);
}
