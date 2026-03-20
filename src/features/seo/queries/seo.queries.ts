import { queryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { seoService } from "../services/seo.service";

export const seoKeys = {
	all: ["seo"] as const,
	page: (slug: string) => [...seoKeys.all, "page", slug] as const,
};

export const seoQueries = {
	page: (slug: string) =>
		queryOptions({
			queryKey: seoKeys.page(slug),
			queryFn: () => seoService.getPage(slug),
			enabled: !!slug,
		}),
};

export function useSEOPageQuery(slug: string) {
	return useQuery(seoQueries.page(slug));
}
