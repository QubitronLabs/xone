"use client";

import type { ReactNode } from "react";
import { QueryProvider } from "./QueryProvider";
import { WagmiProvider } from "./WagmiProvider";
import { ThemeProvider } from "./ThemeProvider";
import { AuthModals } from "@/features/auth/components/AuthModals";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<WagmiProvider>
			<QueryProvider>
				<ThemeProvider>
					{children}
					<AuthModals />
				</ThemeProvider>
			</QueryProvider>
		</WagmiProvider>
	);
}
