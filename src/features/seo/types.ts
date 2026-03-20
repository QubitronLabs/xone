export interface SEOPage {
	slug: string;
	title: string;
	description: string;
	content: string;
	ogImage?: string;
	canonicalUrl?: string;
	noIndex?: boolean;
	schema?: Record<string, unknown>;
	updatedAt: string;
}
