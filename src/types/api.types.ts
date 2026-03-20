// ── Generic API Response Types ─────────────────────────────────────

export interface ApiResponse<T> {
	success: boolean;
	data: T;
	message?: string;
}

export interface ApiError {
	success: false;
	message: string;
	code?: string;
	errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
	hasMore: boolean;
	nextPage: number | null;
}

export interface InfiniteQueryPage<T> {
	data: T[];
	nextPage: number | null;
}
