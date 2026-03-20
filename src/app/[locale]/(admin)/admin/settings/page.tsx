import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("admin");
	return { title: t("settings") };
}

export default function AdminSettingsPage() {
	const t = useTranslations("admin");
	const tPages = useTranslations("pages");

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold text-foreground">
				{t("settings")}
			</h1>
			<p className="text-muted-foreground">
				{tPages("settingsDescription")}
			</p>
		</div>
	);
}
