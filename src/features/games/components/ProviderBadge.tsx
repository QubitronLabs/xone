import Image from "next/image";
import { cn } from "@/lib/utils";
import type { GameProvider } from "../types";

interface ProviderBadgeProps {
	provider: GameProvider;
	isActive?: boolean;
	onClick?: (slug: string) => void;
}

export function ProviderBadge({
	provider,
	isActive,
	onClick,
}: ProviderBadgeProps) {
	return (
		<button
			type="button"
			onClick={() => onClick?.(provider.slug)}
			className={cn(
				"flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors",
				isActive
					? "border-primary bg-primary/10 text-primary"
					: "border-border hover:border-primary/50",
			)}
		>
			{provider.logo && (
				<Image
					src={provider.logo}
					alt={provider.name}
					width={20}
					height={20}
					className="rounded-sm"
				/>
			)}
			<span>{provider.name}</span>
			<span className="text-xs text-muted-foreground">
				({provider.gameCount})
			</span>
		</button>
	);
}
