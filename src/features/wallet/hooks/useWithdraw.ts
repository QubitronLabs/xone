"use client";

import {
	useWithdrawMutation,
	useInvalidateWallet,
} from "../queries/wallet.queries";
import { useWalletStore } from "../store/wallet.slice";
import type { WithdrawRequest } from "../types";

/**
 * Business-logic hook for withdrawals.
 * Composes the API mutation with wallet store updates.
 * Extend with wagmi / on-chain verification here.
 */
export function useWithdraw() {
	const { setPendingTx } = useWalletStore();
	const { invalidateBalance } = useInvalidateWallet();
	const mutation = useWithdrawMutation();

	const withdraw = (data: WithdrawRequest) => {
		mutation.mutate(data, {
			onSuccess: (tx) => {
				setPendingTx(tx.txHash ?? null);
				invalidateBalance();
			},
		});
	};

	return {
		withdraw,
		isPending: mutation.isPending,
		error: mutation.error,
		data: mutation.data,
	};
}
