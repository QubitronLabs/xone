"use client";

import { APP_CONFIG } from "@/config/app.config";

export function WithdrawTab() {
	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold">Withdraw</h3>
			<p className="text-sm text-muted-foreground">
				Withdraw tokens from your {APP_CONFIG.name} balance.
			</p>
			<div className="space-y-3">
				<input
					type="text"
					placeholder="Recipient address (0x…)"
					className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
				/>
				<input
					type="number"
					placeholder="Amount"
					className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
				/>
				<button className="flex h-10 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground">
					Withdraw
				</button>
			</div>
		</div>
	);
}
