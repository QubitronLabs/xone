import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("pages");
	return { title: t("vipClub") };
}

export default function VipClubPage() {
	const t = useTranslations("pages");

	return (
		<div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
			<h1 className="mb-8 text-3xl font-bold text-foreground">
				{t("vipClub")}
			</h1>
			<p className="text-muted-foreground">{t("vipDescription")}</p>
		</div>
	);
}
