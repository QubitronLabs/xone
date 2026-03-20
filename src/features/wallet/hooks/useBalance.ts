"use client";

import { useBalance as useWagmiBalance } from "wagmi";
import {
	useWalletBalanceQuery,
	useTxHistoryQuery,
} from "../queries/wallet.queries";

/**
 * Combines on-chain (wagmi) and platform (API) balance data.
 */
export function useBalance(address?: `0x${string}`) {
	const apiBalance = useWalletBalanceQuery();
	const onChainBalance = useWagmiBalance({ address });

	return {
		tokens: apiBalance.data,
		isLoading: apiBalance.isLoading,
		error: apiBalance.error,
		onChain: onChainBalance.data,
		isOnChainLoading: onChainBalance.isLoading,
	};
}

export function useTxHistory(page = 1) {
	return useTxHistoryQuery(page);
}
