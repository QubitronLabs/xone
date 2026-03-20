import { create } from "zustand";
import type { LiveBet } from "../types";
import { DUMMY_LIVE_BETS } from "@/temp_data";

interface BetsState {
	bets: LiveBet[];
	addBet: (bet: LiveBet) => void;
	setBets: (bets: LiveBet[]) => void;
}

export const useBetsStore = create<BetsState>((set) => ({
	bets: DUMMY_LIVE_BETS,
	addBet: (bet) =>
		set((s) => ({
			bets: [bet, ...s.bets.slice(0, 49)],
		})),
	setBets: (bets) => set({ bets }),
}));
