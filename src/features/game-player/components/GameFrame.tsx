"use client";

interface GameFrameProps {
	launchUrl: string;
	title: string;
	gameId?: string;
}

export function GameFrame({ launchUrl, title }: GameFrameProps) {
	return (
		<div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-black">
			<iframe
				src={launchUrl}
				title={title}
				className="absolute inset-0 h-full w-full"
				allow="fullscreen; autoplay"
				sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
			/>
		</div>
	);
}
