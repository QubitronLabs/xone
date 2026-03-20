import { useTranslations } from "next-intl";

export default async function AdminBlogEditPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const t = useTranslations("admin");
	const isNew = id === "new";

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold text-foreground">
				{isNew ? t("createPost") : t("editPost")}
			</h1>
			<p className="text-muted-foreground">
				Blog post editor will be rendered here (ID: {id}).
			</p>
		</div>
	);
}
