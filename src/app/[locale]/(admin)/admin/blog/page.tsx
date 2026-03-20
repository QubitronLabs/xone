import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("admin");
	return { title: t("blogPosts") };
}

export default function AdminBlogPage() {
	const t = useTranslations("admin");
	const tPages = useTranslations("pages");

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold text-foreground">
					{t("blog")}
				</h1>
			</div>
			<p className="text-muted-foreground">{tPages("blogDescription")}</p>
		</div>
	);
}
