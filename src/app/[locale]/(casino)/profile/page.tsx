import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Profile",
};

export default function ProfilePage() {
	return (
		<div className="space-y-8">
			{/* Profile content — tabbed: Leaderboard | Bets | Transaction */}
			<p className="text-muted-foreground">Profile page with tabs.</p>
		</div>
	);
}
