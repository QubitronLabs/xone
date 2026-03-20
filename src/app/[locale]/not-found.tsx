import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFoundPage() {
	const t = useTranslations("errors");

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
			<h1 className="text-6xl font-bold text-primary">404</h1>
			<h2 className="text-2xl font-semibold text-foreground">
				{t("notFound")}
			</h2>
			<p className="max-w-md text-muted-foreground">
				{t("notFoundDescription")}
			</p>
			<Link
				href="/"
				className="mt-4 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
			>
				{t("goHome")}
			</Link>
		</div>
	);
}
