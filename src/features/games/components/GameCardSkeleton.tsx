import { cn } from "@/lib/utils";

interface GameCardSkeletonProps {
	className?: string;
}

export function GameCardSkeleton({ className }: GameCardSkeletonProps) {
	return (
		<div
			className={cn(
				"overflow-hidden rounded-xl border border-border/50 bg-card",
				className,
			)}
		>
			<div className="aspect-[4/3] w-full animate-pulse bg-muted" />
			<div className="space-y-1.5 p-2">
				<div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
				<div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
			</div>
		</div>
	);
}
