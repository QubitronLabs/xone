import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { UserTable } from "@/features/admin";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("admin");
	return { title: t("manageUsers") };
}

export default function AdminUsersPage() {
	const t = useTranslations("admin");

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold text-foreground">{t("users")}</h1>
			<UserTable />
		</div>
	);
}
