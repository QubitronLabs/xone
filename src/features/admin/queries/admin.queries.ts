import { queryOptions } from "@tanstack/react-query";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../services/admin.service";
import type { BlogPost } from "../types";

export const adminKeys = {
	all: ["admin"] as const,
	users: (page: number) => [...adminKeys.all, "users", page] as const,
	blog: () => [...adminKeys.all, "blog"] as const,
	blogDetail: (id: string) => [...adminKeys.all, "blog", id] as const,
	tags: () => [...adminKeys.all, "tags"] as const,
	seo: () => [...adminKeys.all, "seo"] as const,
};

export const adminQueries = {
	users: (page = 1) =>
		queryOptions({
			queryKey: adminKeys.users(page),
			queryFn: () => adminService.users(page),
		}),

	blogList: () =>
		queryOptions({
			queryKey: adminKeys.blog(),
			queryFn: () => adminService.blogList(),
		}),

	blogDetail: (id: string) =>
		queryOptions({
			queryKey: adminKeys.blogDetail(id),
			queryFn: () => adminService.blogDetail(id),
			enabled: !!id,
		}),

	tags: () =>
		queryOptions({
			queryKey: adminKeys.tags(),
			queryFn: () => adminService.tags(),
		}),

	seoPages: () =>
		queryOptions({
			queryKey: adminKeys.seo(),
			queryFn: () => adminService.seoPages(),
		}),
};

// --- Query Hooks ---

export function useAdminUsersQuery(page = 1) {
	return useQuery(adminQueries.users(page));
}

export function useAdminBlogListQuery() {
	return useQuery(adminQueries.blogList());
}

export function useAdminBlogDetailQuery(id: string) {
	return useQuery(adminQueries.blogDetail(id));
}

export function useAdminTagsQuery() {
	return useQuery(adminQueries.tags());
}

export function useAdminSEOPagesQuery() {
	return useQuery(adminQueries.seoPages());
}

// --- Mutation Hooks ---

export function useSaveBlogMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (post: Partial<BlogPost>) => adminService.saveBlog(post),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: adminKeys.blog() });
		},
	});
}
