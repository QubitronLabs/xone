import { GameFrame } from "@/features/game-player";

export default async function GamePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return<div></div>
}
