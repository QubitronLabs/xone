import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("nav");
	return { title: t("promotions") };
}

export default function PromotionsPage() {
	const t = useTranslations("nav");
	const tPages = useTranslations("pages");

	return (
		<div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
			<h1 className="mb-8 text-3xl font-bold text-foreground">
				{t("promotions")}
			</h1>
			<p className="text-muted-foreground">
				{tPages("promotionsDescription")}
			</p>
		</div>
	);
}
