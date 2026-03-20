"use client";

import { useTranslations } from "next-intl";
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
	const t = useTranslations("games");
	const [provider, setProvider] = useQueryParam("provider", "");
	const { data: providers = [] } = useGameProviders();

	return (
		<Select
			value={provider}
			onValueChange={(val) => setProvider(val || null)}
		>
			<SelectTrigger className="w-48">
				<SelectValue placeholder={t("selectProvider")} />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="">{t("allProviders")}</SelectItem>
				{providers.map((p) => (
					<SelectItem key={p.slug} value={p.slug}>
						{p.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
