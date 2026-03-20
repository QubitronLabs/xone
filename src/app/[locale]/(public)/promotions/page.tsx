import type { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
	title: "Promotions",
};

export default function PromotionsPage() {
	const t = useTranslations("nav");

	return (
		<div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
			<h1 className="mb-8 text-3xl font-bold text-foreground">
				{t("promotions")}
			</h1>
			<p className="text-muted-foreground">
				Active promotions will be displayed here.
			</p>
		</div>
	);
}
