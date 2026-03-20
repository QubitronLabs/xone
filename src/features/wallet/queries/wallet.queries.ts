import { queryOptions } from "@tanstack/react-query";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as walletService from "../services/wallet.service";
import type { DepositRequest, WithdrawRequest, SwapQuote } from "../types";

export const walletKeys = {
	all: ["wallet"] as const,
	balance: () => [...walletKeys.all, "balance"] as const,
	transactions: (page: number) =>
		[...walletKeys.all, "transactions", page] as const,
	swapQuote: (from: string, to: string, amount: string) =>
		[...walletKeys.all, "swap-quote", from, to, amount] as const,
};

export const walletQueries = {
	balance: () =>
		queryOptions({
			queryKey: walletKeys.balance(),
			queryFn: () => walletService.getBalance(),
			staleTime: 5_000,
		}),

	transactions: (page = 1) =>
		queryOptions({
			queryKey: walletKeys.transactions(page),
			queryFn: () => walletService.getTransactions(page),
			staleTime: 30_000,
		}),

	swapQuote: (fromToken: string, toToken: string, amount: string) =>
		queryOptions({
			queryKey: walletKeys.swapQuote(fromToken, toToken, amount),
			queryFn: () =>
				walletService.getSwapQuote(fromToken, toToken, amount),
			enabled: !!fromToken && !!toToken && !!amount && Number(amount) > 0,
			staleTime: 10_000,
		}),
};

// --- Query Hooks ---

export function useWalletBalanceQuery() {
	return useQuery(walletQueries.balance());
}

export function useTxHistoryQuery(page = 1) {
	return useQuery(walletQueries.transactions(page));
}

export function useSwapQuoteQuery(
	fromToken: string,
	toToken: string,
	amount: string,
) {
	return useQuery(walletQueries.swapQuote(fromToken, toToken, amount));
}

// --- Mutation Hooks ---

export function useDepositMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: DepositRequest) => walletService.deposit(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: walletKeys.balance() });
			queryClient.invalidateQueries({ queryKey: walletKeys.all });
		},
	});
}

export function useWithdrawMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: WithdrawRequest) => walletService.withdraw(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: walletKeys.balance() });
			queryClient.invalidateQueries({ queryKey: walletKeys.all });
		},
	});
}

export function useExecuteSwapMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (quote: SwapQuote) => walletService.executeSwap(quote),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: walletKeys.balance() });
		},
	});
}

// --- Invalidation Helpers ---

export function useInvalidateWallet() {
	const queryClient = useQueryClient();
	return {
		invalidateBalance: () =>
			queryClient.invalidateQueries({ queryKey: walletKeys.balance() }),
		invalidateAll: () =>
			queryClient.invalidateQueries({ queryKey: walletKeys.all }),
	};
}
