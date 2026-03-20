import type { StateCreator } from "zustand";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { APP_CONFIG } from "@/config/app.config";

export interface WalletSlice {
	selectedToken: string;
	pendingTxHash: string | null;
	activeTab: "overview" | "deposit" | "withdraw" | "swap";
	setSelectedToken: (token: string) => void;
	setPendingTx: (hash: string | null) => void;
	setActiveTab: (tab: WalletSlice["activeTab"]) => void;
}

const createWalletSlice: StateCreator<WalletSlice, [], [], WalletSlice> = (
	set,
) => ({
	selectedToken: "ETH",
	pendingTxHash: null,
	activeTab: "overview",
	setSelectedToken: (token) => set({ selectedToken: token }),
	setPendingTx: (hash) => set({ pendingTxHash: hash }),
	setActiveTab: (tab) => set({ activeTab: tab }),
});

export const useWalletStore = create<WalletSlice>()(
	devtools(
		persist(createWalletSlice, { name: APP_CONFIG.storeKeys.wallet }),
		{
			name: "wallet-store",
		},
	),
);
