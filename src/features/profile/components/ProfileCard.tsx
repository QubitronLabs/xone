"use client";

import Image from "next/image";
import type { Profile } from "../types";

interface ProfileCardProps {
	profile: Profile;
	isOwnProfile?: boolean;
}

export function ProfileCard({ profile, isOwnProfile }: ProfileCardProps) {
	return (
		<div className="overflow-hidden rounded-xl border border-border bg-card">
			<div className="h-24 bg-gradient-to-r from-primary/30 to-primary/10" />
			<div className="px-6 pb-6">
				<div className="-mt-12 flex items-end gap-4">
					<div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-card bg-muted">
						{profile.avatar ? (
							<Image
								src={profile.avatar}
								alt={profile.username}
								fill
								className="object-cover"
							/>
						) : (
							<div className="flex h-full w-full items-center justify-center text-2xl font-bold text-muted-foreground">
								{profile.username[0]?.toUpperCase()}
							</div>
						)}
					</div>
					<div className="mb-1">
						<h2 className="text-lg font-bold">
							{profile.displayName ?? profile.username}
						</h2>
						<p className="text-sm text-muted-foreground">
							@{profile.username}
						</p>
					</div>
				</div>

				{profile.bio && (
					<p className="mt-3 text-sm text-muted-foreground">
						{profile.bio}
					</p>
				)}

				<div className="mt-4 grid grid-cols-3 gap-4 text-center">
					<div>
						<p className="text-lg font-bold">{profile.totalBets}</p>
						<p className="text-xs text-muted-foreground">Bets</p>
					</div>
					<div>
						<p className="text-lg font-bold">Lvl {profile.level}</p>
						<p className="text-xs text-muted-foreground">Level</p>
					</div>
					<div>
						<p className="text-lg font-bold">
							${profile.totalWagered.toFixed(0)}
						</p>
						<p className="text-xs text-muted-foreground">Wagered</p>
					</div>
				</div>
			</div>
		</div>
	);
}
