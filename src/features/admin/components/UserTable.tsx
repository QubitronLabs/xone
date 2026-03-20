"use client";

import { cn } from "@/lib/utils";
import { useAdminUsers } from "../hooks/useAdminData";
import { useState } from "react";

export function UserTable() {
	const [page, setPage] = useState(1);
	const { data, isLoading } = useAdminUsers(page);

	if (isLoading) {
		return (
			<div className="space-y-2">
				{Array.from({ length: 10 }, (_, i) => (
					<div
						key={i}
						className="h-12 animate-pulse rounded bg-muted"
					/>
				))}
			</div>
		);
	}

	const users = data?.data ?? [];

	return (
		<div className="overflow-x-auto rounded-xl border border-border">
			<table className="w-full text-sm">
				<thead className="bg-muted/30">
					<tr className="text-left text-xs text-muted-foreground">
						<th className="px-4 py-3 font-medium">Username</th>
						<th className="px-4 py-3 font-medium">Email</th>
						<th className="px-4 py-3 font-medium">Role</th>
						<th className="px-4 py-3 font-medium">Status</th>
						<th className="px-4 py-3 font-medium text-right">
							Wagered
						</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id} className="border-t border-border/50">
							<td className="px-4 py-2 font-medium">
								{user.username}
							</td>
							<td className="px-4 py-2 text-muted-foreground">
								{user.email}
							</td>
							<td className="px-4 py-2">
								<span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs capitalize">
									{user.role}
								</span>
							</td>
							<td className="px-4 py-2">
								<span
									className={cn(
										"rounded-full px-2 py-0.5 text-xs capitalize",
										user.status === "active" &&
											"bg-green-500/10 text-green-500",
										user.status === "banned" &&
											"bg-red-500/10 text-red-500",
										user.status === "suspended" &&
											"bg-yellow-500/10 text-yellow-500",
									)}
								>
									{user.status}
								</span>
							</td>
							<td className="px-4 py-2 text-right tabular-nums">
								${user.totalWagered.toFixed(2)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{data && data.totalPages > 1 && (
				<div className="flex items-center justify-between border-t border-border px-4 py-3">
					<button
						type="button"
						onClick={() => setPage((p) => Math.max(1, p - 1))}
						disabled={page <= 1}
						className="rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-50"
					>
						Previous
					</button>
					<span className="text-sm text-muted-foreground">
						Page {page} of {data.totalPages}
					</span>
					<button
						type="button"
						onClick={() => setPage((p) => p + 1)}
						disabled={!data.hasMore}
						className="rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-50"
					>
						Next
					</button>
				</div>
			)}
		</div>
	);
}
