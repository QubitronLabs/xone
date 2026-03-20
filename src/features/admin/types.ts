export interface AdminUser {
	id: string;
	username: string;
	email: string;
	role: "user" | "vip" | "moderator" | "admin";
	status: "active" | "banned" | "suspended";
	joinedAt: string;
	lastLogin: string;
	totalWagered: number;
}

export interface BlogPost {
	id: string;
	title: string;
	slug: string;
	content: string;
	excerpt: string;
	featuredImage?: string;
	tags: string[];
	status: "draft" | "published";
	publishedAt?: string;
	createdAt: string;
	updatedAt: string;
}

export interface Tag {
	id: string;
	name: string;
	slug: string;
	count: number;
}

export interface AdminSEOPage {
	id: string;
	slug: string;
	title: string;
	description: string;
	content: string;
	isActive: boolean;
}
