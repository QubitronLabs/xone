import type { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
	title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
	const t = useTranslations("pages");

	return (
		<div className="mx-auto max-w-4xl px-4 py-12 md:px-8">
			<h1 className="mb-8 text-3xl font-bold text-foreground">
				{t("privacyPolicy")}
			</h1>
			<p className="text-muted-foreground">
				Privacy policy content will be loaded here.
			</p>
		</div>
	);
}
