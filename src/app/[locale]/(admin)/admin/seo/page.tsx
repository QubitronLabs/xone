import type { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
	title: "SEO Management",
};

export default function AdminSeoPage() {
	const t = useTranslations("admin");

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold text-foreground">{t("seo")}</h1>
			<p className="text-muted-foreground">
				SEO page management interface will be rendered here.
			</p>
		</div>
	);
}
