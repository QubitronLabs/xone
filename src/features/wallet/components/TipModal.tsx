"use client";

export function TipModal() {
	return (
		<div className="space-y-4 p-4">
			<h3 className="text-lg font-semibold">Send Tip</h3>
			<input
				type="text"
				placeholder="Username"
				className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
			/>
			<input
				type="number"
				placeholder="Amount"
				className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
			/>
			<button className="flex h-10 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground">
				Send Tip
			</button>
		</div>
	);
}
