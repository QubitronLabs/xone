export interface Banner {
	id: string;
	title: string;
	subtitle?: string;
	imageUrl: string;
	mobileImageUrl?: string;
	linkUrl?: string;
	layout: "hero" | "card" | "strip" | "popup";
	position: number;
	isActive: boolean;
	startsAt?: string;
	endsAt?: string;
}

export interface BannerConfig {
	banners: Banner[];
	autoPlayInterval: number;
}
