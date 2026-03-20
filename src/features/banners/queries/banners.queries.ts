import { queryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { bannersService } from "../services/banners.service";

export const bannerKeys = {
	all: ["banners"] as const,
	active: () => [...bannerKeys.all, "active"] as const,
};

export const bannerQueries = {
	active: () =>
		queryOptions({
			queryKey: bannerKeys.active(),
			queryFn: () => bannersService.active(),
			staleTime: 2 * 60_000,
		}),
};

export function useBannersQuery() {
	return useQuery(bannerQueries.active());
}
