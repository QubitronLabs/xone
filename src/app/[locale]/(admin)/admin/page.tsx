import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("admin");
	return { title: t("title") };
}

export default function AdminRootPage() {
	redirect("admin/users");
}
