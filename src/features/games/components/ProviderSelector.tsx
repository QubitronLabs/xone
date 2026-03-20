"use client";

import { useQueryParam } from "@/hooks/use-query-param";
import { useGameProviders } from "../hooks/useGames";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export function ProviderSelector() {
	const [provider, setProvider] = useQueryParam("provider", "");
	const { data: providers = [] } = useGameProviders();

	return (
		<Select
			value={provider}
			onValueChange={(val) => setProvider(val || null)}
		>
			<SelectTrigger className="w-48">
				<SelectValue placeholder="Select Provider" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="">All Providers</SelectItem>
				{providers.map((p) => (
					<SelectItem key={p.slug} value={p.slug}>
						{p.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
