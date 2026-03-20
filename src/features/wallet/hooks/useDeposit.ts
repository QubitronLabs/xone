"use client";

import {
	useDepositMutation,
	useInvalidateWallet,
} from "../queries/wallet.queries";
import { useWalletStore } from "../store/wallet.slice";
import type { DepositRequest } from "../types";

/**
 * Business-logic hook for deposits.
 * Composes the API mutation with wallet store updates.
 * Extend with wagmi writeContract / on-chain logic here.
 */
export function useDeposit() {
	const { setPendingTx } = useWalletStore();
	const { invalidateBalance } = useInvalidateWallet();
	const mutation = useDepositMutation();

	const deposit = (data: DepositRequest) => {
		mutation.mutate(data, {
			onSuccess: (tx) => {
				setPendingTx(tx.txHash ?? null);
				invalidateBalance();
			},
		});
	};

	return {
		deposit,
		isPending: mutation.isPending,
		error: mutation.error,
		data: mutation.data,
	};
}
