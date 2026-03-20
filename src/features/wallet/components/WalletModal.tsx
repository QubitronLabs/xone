"use client";

import { useTranslations } from "next-intl";
import { useWalletStore } from "../store/wallet.slice";
import { OverviewTab } from "./OverviewTab";
import { DepositTab } from "./DepositTab";
import { WithdrawTab } from "./WithdrawTab";
import { SwapTab } from "./SwapTab";

const tabs = [
	{ key: "overview", label: "Overview" },
	{ key: "deposit", label: "Deposit" },
	{ key: "withdraw", label: "Withdraw" },
	{ key: "swap", label: "Swap" },
] as const;

export function WalletModal() {
	const t = useTranslations("wallet");
	const activeTab = useWalletStore((s) => s.activeTab);
	const setActiveTab = useWalletStore((s) => s.setActiveTab);

	return (
		<div className="flex h-full flex-col">
			{/* Tab Switcher */}
			<div className="flex border-b border-border">
				{tabs.map((tab) => (
					<button
						key={tab.key}
						onClick={() => setActiveTab(tab.key)}
						className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
							activeTab === tab.key
								? "border-b-2 border-primary text-primary"
								: "text-muted-foreground hover:text-foreground"
						}`}
					>
						{tab.label}
					</button>
				))}
			</div>

			{/* Tab Content */}
			<div className="flex-1 overflow-y-auto p-4">
				{activeTab === "overview" && <OverviewTab />}
				{activeTab === "deposit" && <DepositTab />}
				{activeTab === "withdraw" && <WithdrawTab />}
				{activeTab === "swap" && <SwapTab />}
			</div>
		</div>
	);
}
