"use client";

import { APP_CONFIG } from "@/config/app.config";

export function DepositTab() {
	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold">Deposit</h3>
			<p className="text-sm text-muted-foreground">
				Send tokens to your {APP_CONFIG.name} wallet address.
			</p>
			<div className="rounded-lg border border-border bg-muted/30 p-4">
				<p className="text-xs text-muted-foreground">
					Your deposit address
				</p>
				<p className="mt-1 break-all font-mono text-sm">
					Connect wallet to view address
				</p>
			</div>
		</div>
	);
}
