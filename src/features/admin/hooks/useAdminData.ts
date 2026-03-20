"use client";

import {
	useAdminUsersQuery,
	useAdminBlogListQuery,
	useAdminBlogDetailQuery,
	useSaveBlogMutation,
	useAdminTagsQuery,
	useAdminSEOPagesQuery,
} from "../queries/admin.queries";

/**
 * Business-logic hooks for admin.
 * Currently thin wrappers — extend with permission checks,
 * optimistic updates, etc.
 */

export function useAdminUsers(page = 1) {
	return useAdminUsersQuery(page);
}

export function useAdminBlogList() {
	return useAdminBlogListQuery();
}

export function useAdminBlogDetail(id: string) {
	return useAdminBlogDetailQuery(id);
}

export function useSaveBlog() {
	return useSaveBlogMutation();
}

export function useAdminTags() {
	return useAdminTagsQuery();
}

export function useAdminSEOPages() {
	return useAdminSEOPagesQuery();
}
