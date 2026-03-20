import type { SEOPage } from "../types";

interface SEOPageRendererProps {
	page: SEOPage;
}

export function SEOPageRenderer({ page }: SEOPageRendererProps) {
	return (
		<article className="prose prose-invert mx-auto max-w-3xl">
			<h1>{page.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: page.content }} />
		</article>
	);
}
