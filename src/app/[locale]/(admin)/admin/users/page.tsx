import type { Metadata } from "next";
import { UserTable } from "@/features/admin";

export const metadata: Metadata = {
	title: "Manage Users",
};

export default function AdminUsersPage() {
	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold text-foreground">Users</h1>
			<UserTable />
		</div>
	);
}
