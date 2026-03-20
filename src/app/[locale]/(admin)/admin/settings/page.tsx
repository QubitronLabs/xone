import type { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
	title: "Settings",
};

export default function AdminSettingsPage() {
	const t = useTranslations("admin");

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold text-foreground">
				{t("settings")}
			</h1>
			<p className="text-muted-foreground">
				Application settings interface will be rendered here.
			</p>
		</div>
	);
}
