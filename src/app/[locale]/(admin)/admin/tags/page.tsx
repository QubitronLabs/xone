import type { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
	title: "Manage Tags",
};

export default function AdminTagsPage() {
	const t = useTranslations("admin");

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold text-foreground">{t("tags")}</h1>
			<p className="text-muted-foreground">
				Tag management interface will be rendered here.
			</p>
		</div>
	);
}
