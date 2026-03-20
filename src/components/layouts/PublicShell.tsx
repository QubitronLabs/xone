import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { APP_CONFIG } from "@/config/app.config";

interface PublicShellProps {
	children: ReactNode;
}

export function PublicShell({ children }: PublicShellProps) {
	const t = useTranslations("common");
	return (
		<div className="flex min-h-screen flex-col bg-background">
			{/* Public Header */}
			<header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur md:px-8">
				<span className="text-[clamp(18px,1.1rem+0.2vw,20px)] font-bold text-primary">
					{APP_CONFIG.name}
				</span>
			</header>

			{/* Main Content */}
			<main className="flex-1">{children}</main>

			{/* Footer */}
			<footer className="border-t border-border bg-muted/30 px-4 py-8 md:px-8">
				<div className="mx-auto max-w-6xl text-center text-[clamp(13px,0.8rem+0.1vw,14px)] text-muted-foreground">
					&copy; {new Date().getFullYear()} {APP_CONFIG.title}.{" "}
					{t("allRightsReserved")}
				</div>
			</footer>
		</div>
	);
}
