"use client";

import {
	useSwapQuoteQuery,
	useExecuteSwapMutation,
	useInvalidateWallet,
} from "../queries/wallet.queries";
import type { SwapQuote } from "../types";

/**
 * Business-logic hook for token swaps.
 * Composes quote query + execute mutation.
 * Extend with DEX / on-chain swap logic here.
 */
export function useSwap(fromToken: string, toToken: string, amount: string) {
	const quote = useSwapQuoteQuery(fromToken, toToken, amount);
	const executeMutation = useExecuteSwapMutation();
	const { invalidateBalance } = useInvalidateWallet();

	const executeSwap = (swapQuote: SwapQuote) => {
		executeMutation.mutate(swapQuote, {
			onSuccess: () => {
				invalidateBalance();
			},
		});
	};

	return {
		quote: quote.data,
		isQuoteLoading: quote.isLoading,
		quoteError: quote.error,
		executeSwap,
		isExecuting: executeMutation.isPending,
		executeError: executeMutation.error,
	};
}
