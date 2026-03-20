import type { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
	title: "Blog Posts",
};

export default function AdminBlogPage() {
	const t = useTranslations("admin");

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold text-foreground">
					{t("blog")}
				</h1>
			</div>
			<p className="text-muted-foreground">
				Blog posts management table will be rendered here.
			</p>
		</div>
	);
}
