import type { Metadata } from "next";
import type { SEOPage } from "../types";

export function buildMetadata(page: SEOPage): Metadata {
	return {
		title: page.title,
		description: page.description,
		openGraph: {
			title: page.title,
			description: page.description,
			images: page.ogImage ? [{ url: page.ogImage }] : undefined,
		},
		alternates: page.canonicalUrl
			? { canonical: page.canonicalUrl }
			: undefined,
		robots: page.noIndex ? { index: false, follow: false } : undefined,
	};
}
