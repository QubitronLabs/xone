import { useTranslations } from "next-intl";

export default async function AdminBlogEditPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const t = useTranslations("admin");
	const tPages = useTranslations("pages");
	const isNew = id === "new";

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold text-foreground">
				{isNew ? t("createPost") : t("editPost")}
			</h1>
			<p className="text-muted-foreground">
				{tPages("blogEditorDescription", { id })}
			</p>
		</div>
	);
}
