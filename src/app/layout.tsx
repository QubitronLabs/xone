import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { getLocale } from "next-intl/server";
import { cn } from "@/lib/utils";
import { APP_CONFIG } from "@/config/app.config";
import "@/styles/globals.css";

/* ── Fredoka (normal width): 300–700 ── */
const fredoka = localFont({
	src: [
		{
			path: "../../public/assets/fonts/Fredoka/static/Fredoka-Regular.ttf",
			weight: "400",
		},
		{
			path: "../../public/assets/fonts/Fredoka/static/Fredoka-Medium.ttf",
			weight: "500",
		},
		{
			path: "../../public/assets/fonts/Fredoka/static/Fredoka-SemiBold.ttf",
			weight: "600",
		},
	],
	variable: "--font-fredoka",
	display: "swap",
});

/* ── Notable: 400 only ── */
const notable = localFont({
	src: "../../public/assets/fonts/Notable/Notable-Regular.ttf",
	variable: "--font-notable",
	display: "swap",
	weight: "400",
});

export const metadata: Metadata = {
	title: {
		default: APP_CONFIG.title,
		template: APP_CONFIG.meta.titleTemplate,
	},
	description: APP_CONFIG.description,
};

export default async function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	const locale = await getLocale();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body
				className={cn(
					fredoka.variable,
					notable.variable,
					"font-fredoka antialiased bg-linear-to-b from-[#19162B] to-[#1A132C] text-foreground bg-no-repeat bg-center bg-cover min-h-screen",
				)}
			>
				{children}
			</body>
		</html>
	);
}
