import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
	WalletToken,
	TxHistory,
	DepositRequest,
	WithdrawRequest,
	SwapQuote,
} from "../types";
import { DUMMY_WALLET_BALANCE, DUMMY_TX_HISTORY } from "@/temp_data";

export async function getBalance(): Promise<WalletToken[]> {
	try {
		const res = await apiClient.get<ApiResponse<WalletToken[]>>(
			ENDPOINTS.WALLET.BALANCE,
		);
		return res.data.data;
	} catch {
		return DUMMY_WALLET_BALANCE;
	}
}

export async function getTransactions(
	page = 1,
): Promise<PaginatedResponse<TxHistory>> {
	try {
		const res = await apiClient.get<PaginatedResponse<TxHistory>>(
			ENDPOINTS.WALLET.TRANSACTIONS,
			{
				params: { page },
			},
		);
		return res.data;
	} catch {
		return DUMMY_TX_HISTORY(page);
	}
}

export async function deposit(data: DepositRequest): Promise<TxHistory> {
	try {
		const res = await apiClient.post<ApiResponse<TxHistory>>(
			ENDPOINTS.WALLET.DEPOSIT,
			data,
		);
		return res.data.data;
	} catch {
		return {
			id: `tx-dummy-${Date.now()}`,
			type: "deposit",
			amount: data.amount,
			token: data.token,
			status: "confirmed",
			txHash: data.txHash,
			createdAt: new Date().toISOString(),
		};
	}
}

export async function withdraw(data: WithdrawRequest): Promise<TxHistory> {
	try {
		const res = await apiClient.post<ApiResponse<TxHistory>>(
			ENDPOINTS.WALLET.WITHDRAW,
			data,
		);
		return res.data.data;
	} catch {
		return {
			id: `tx-dummy-${Date.now()}`,
			type: "withdraw",
			amount: data.amount,
			token: data.token,
			status: "pending",
			createdAt: new Date().toISOString(),
		};
	}
}

export async function getSwapQuote(
	fromToken: string,
	toToken: string,
	amount: string,
): Promise<SwapQuote> {
	try {
		const res = await apiClient.get<ApiResponse<SwapQuote>>(
			ENDPOINTS.WALLET.SWAP,
			{
				params: { fromToken, toToken, amount },
			},
		);
		return res.data.data;
	} catch {
		return {
			fromToken,
			toToken,
			fromAmount: amount,
			toAmount: (Number(amount) * 0.98).toFixed(6),
			rate: 0.98,
			priceImpact: 0.02,
			estimatedGas: "0.005",
		};
	}
}

export async function executeSwap(quote: SwapQuote): Promise<TxHistory> {
	try {
		const res = await apiClient.post<ApiResponse<TxHistory>>(
			ENDPOINTS.WALLET.SWAP,
			quote,
		);
		return res.data.data;
	} catch {
		return {
			id: `tx-dummy-${Date.now()}`,
			type: "swap",
			amount: quote.fromAmount,
			token: quote.fromToken,
			status: "confirmed",
			createdAt: new Date().toISOString(),
		};
	}
}
