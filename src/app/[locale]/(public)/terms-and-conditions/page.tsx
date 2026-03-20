import type { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
	title: "Terms and Conditions",
};

export default function TermsPage() {
	const t = useTranslations("pages");

	return (
		<div className="mx-auto max-w-4xl px-4 py-12 md:px-8">
			<h1 className="mb-8 text-3xl font-bold text-foreground">
				{t("termsAndConditions")}
			</h1>
			<p className="text-muted-foreground">
				Terms and conditions content will be loaded here.
			</p>
		</div>
	);
}
