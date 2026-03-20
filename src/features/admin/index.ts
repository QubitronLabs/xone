export { UserTable } from "./components/UserTable";
// Business-logic hooks
export {
	useAdminUsers,
	useAdminBlogList,
	useAdminBlogDetail,
	useSaveBlog,
	useAdminTags,
	useAdminSEOPages,
} from "./hooks/useAdminData";
// TanStack Query wrappers
export {
	adminKeys,
	adminQueries,
	useAdminUsersQuery,
	useAdminBlogListQuery,
	useAdminBlogDetailQuery,
	useSaveBlogMutation,
	useAdminTagsQuery,
	useAdminSEOPagesQuery,
} from "./queries/admin.queries";
export type { AdminUser, BlogPost, Tag, AdminSEOPage } from "./types";
