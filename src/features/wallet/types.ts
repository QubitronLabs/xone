import type { ID } from "@/types/common.types";

export interface WalletToken {
	symbol: string;
	name: string;
	address: string;
	decimals: number;
	balance: string;
	usdValue: number;
	icon?: string;
}

export interface TxHistory {
	id: ID;
	type: "deposit" | "withdraw" | "swap" | "tip";
	amount: string;
	token: string;
	status: "pending" | "confirmed" | "failed";
	txHash?: string;
	createdAt: string;
}

export interface SwapQuote {
	fromToken: string;
	toToken: string;
	fromAmount: string;
	toAmount: string;
	rate: number;
	priceImpact: number;
	estimatedGas: string;
}

export interface DepositRequest {
	token: string;
	amount: string;
	txHash: string;
}

export interface WithdrawRequest {
	token: string;
	amount: string;
	toAddress: string;
}
