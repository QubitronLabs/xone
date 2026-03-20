import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { AdminUser, BlogPost, Tag, AdminSEOPage } from "../types";
import {
	DUMMY_ADMIN_USERS,
	DUMMY_BLOG_POSTS,
	DUMMY_TAGS,
	DUMMY_ADMIN_SEO_PAGES,
} from "@/temp_data";

export const adminService = {
	async users(page = 1): Promise<PaginatedResponse<AdminUser>> {
		try {
			const { data } = await apiClient.get<PaginatedResponse<AdminUser>>(
				ENDPOINTS.ADMIN.USERS,
				{
					params: { page },
				},
			);
			return data;
		} catch {
			return DUMMY_ADMIN_USERS(page);
		}
	},

	async blogList(): Promise<BlogPost[]> {
		try {
			const { data } = await apiClient.get<ApiResponse<BlogPost[]>>(
				ENDPOINTS.ADMIN.BLOG,
			);
			return data.data;
		} catch {
			return DUMMY_BLOG_POSTS;
		}
	},

	async blogDetail(id: string): Promise<BlogPost> {
		try {
			const { data } = await apiClient.get<ApiResponse<BlogPost>>(
				ENDPOINTS.ADMIN.BLOG_DETAIL(id),
			);
			return data.data;
		} catch {
			const found = DUMMY_BLOG_POSTS.find((p) => p.id === id);
			if (found) return found;
			return DUMMY_BLOG_POSTS[0];
		}
	},

	async saveBlog(post: Partial<BlogPost>): Promise<BlogPost> {
		try {
			const method = post.id ? "put" : "post";
			const url = post.id
				? ENDPOINTS.ADMIN.BLOG_DETAIL(post.id)
				: ENDPOINTS.ADMIN.BLOG;
			const { data } = await apiClient[method]<ApiResponse<BlogPost>>(
				url,
				post,
			);
			return data.data;
		} catch {
			return {
				id: post.id ?? `post-dummy-${Date.now()}`,
				title: post.title ?? "Untitled",
				slug: post.slug ?? "untitled",
				content: post.content ?? "",
				excerpt: post.excerpt ?? "",
				tags: post.tags ?? [],
				status: post.status ?? "draft",
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
		}
	},

	async tags(): Promise<Tag[]> {
		try {
			const { data } = await apiClient.get<ApiResponse<Tag[]>>(
				ENDPOINTS.ADMIN.TAGS,
			);
			return data.data;
		} catch {
			return DUMMY_TAGS;
		}
	},

	async seoPages(): Promise<AdminSEOPage[]> {
		try {
			const { data } = await apiClient.get<ApiResponse<AdminSEOPage[]>>(
				ENDPOINTS.ADMIN.SEO,
			);
			return data.data;
		} catch {
			return DUMMY_ADMIN_SEO_PAGES;
		}
	},
};
