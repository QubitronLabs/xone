"use client";

import { useEffect } from "react";
import { getBetsSocket } from "@/lib/sockets/bets.socket";
import { useBetsStore } from "../store/bets.slice";
import type { LiveBet } from "../types";

export function useLiveBets() {
	const { bets, addBet, setBets } = useBetsStore();

	useEffect(() => {
		const socket = getBetsSocket();

		const handleBet = (bet: LiveBet) => addBet(bet);
		const handleRecent = (recent: LiveBet[]) => setBets(recent);

		socket.on("bet", handleBet);
		socket.on("recent", handleRecent);
		socket.emit("subscribe");

		return () => {
			socket.off("bet", handleBet);
			socket.off("recent", handleRecent);
			socket.emit("unsubscribe");
		};
	}, [addBet, setBets]);

	return { bets };
}
