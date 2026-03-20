import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("profile");
	return { title: t("title") };
}

export default function ProfilePage() {
	const t = useTranslations("profile");

	return (
		<div className="space-y-8">
			{/* Profile content — tabbed: Leaderboard | Bets | Transaction */}
			<p className="text-muted-foreground">{t("pageDescription")}</p>
		</div>
	);
}
