import type { Metadata } from "next";
import { APP_CONFIG } from "@/config/app.config";
import { HomepageContent } from "./HomepageContent";
// import { HomepageContent } from "./HomepageContent";

export const metadata: Metadata = {
	title: APP_CONFIG.title,
};

export default function HomePage() {
	return <HomepageContent />;
}
