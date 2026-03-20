import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "VIP Club",
};

export default function VipClubPage() {
	return (
		<div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
			<h1 className="mb-8 text-3xl font-bold text-foreground">
				VIP Club
			</h1>
			<p className="text-muted-foreground">
				VIP tiers, features and rewards will be displayed here.
			</p>
		</div>
	);
}
