"use client";

import { WagmiProvider as WagmiLib } from "wagmi";
import { type ReactNode } from "react";
import { wagmiConfig } from "@/features/wallet/web3/wagmi.config";

export function WagmiProvider({ children }: { children: ReactNode }) {
	return <WagmiLib config={wagmiConfig}>{children}</WagmiLib>;
}
