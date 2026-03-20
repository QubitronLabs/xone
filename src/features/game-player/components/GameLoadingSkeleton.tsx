export function GameLoadingSkeleton() {
	return (
		<div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-card">
			<div className="flex h-full items-center justify-center">
				<div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
			</div>
		</div>
	);
}
