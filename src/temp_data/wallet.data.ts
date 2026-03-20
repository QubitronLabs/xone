import type { WalletToken, TxHistory } from "@/features/wallet/types";
import type { PaginatedResponse } from "@/types/api.types";
import { IMAGES } from "@/config/images.config";

export const DUMMY_WALLET_BALANCE: WalletToken[] = [
	{
		symbol: "USDT",
		name: "Tether",
		address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
		decimals: 6,
		balance: "244455.50",
		usdValue: 244455.5,
		icon: IMAGES.common.elements.treasury.coin,
	},
	{
		symbol: "ETH",
		name: "Ethereum",
		address: "0x0000000000000000000000000000000000000000",
		decimals: 18,
		balance: "2.4500",
		usdValue: 8575.0,
		icon: undefined,
	},
	{
		symbol: "BTC",
		name: "Bitcoin",
		address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
		decimals: 8,
		balance: "0.15000000",
		usdValue: 15750.0,
		icon: undefined,
	},
	{
		symbol: "SOL",
		name: "Solana",
		address: "0x0",
		decimals: 9,
		balance: "120.000",
		usdValue: 18000.0,
		icon: undefined,
	},
	{
		symbol: "BNB",
		name: "BNB",
		address: "0xb8c77482e45f1f44de1745f52c74426c631bdd52",
		decimals: 18,
		balance: "15.500",
		usdValue: 9300.0,
		icon: undefined,
	},
];

function generateTxHistory(page: number): PaginatedResponse<TxHistory> {
	const pageSize = 20;
	const total = 60;
	const totalPages = Math.ceil(total / pageSize);
	const count =
		page <= totalPages
			? Math.min(pageSize, total - (page - 1) * pageSize)
			: 0;

	const types: TxHistory["type"][] = ["deposit", "withdraw", "swap", "tip"];
	const tokens = ["USDT", "ETH", "BTC", "SOL", "BNB"];
	const statuses: TxHistory["status"][] = [
		"confirmed",
		"confirmed",
		"confirmed",
		"pending",
		"failed",
	];

	const data: TxHistory[] = Array.from({ length: count }, (_, i) => {
		const idx = (page - 1) * pageSize + i;
		return {
			id: `tx-${idx + 1}`,
			type: types[idx % types.length],
			amount: [100, 250, 500, 1000, 50, 2500][idx % 6].toString(),
			token: tokens[idx % tokens.length],
			status: statuses[idx % statuses.length],
			txHash: `0x${Array.from({ length: 64 }, (_, j) => ((idx * 7 + j * 13) % 16).toString(16)).join("")}`,
			createdAt: new Date(Date.now() - idx * 7200000).toISOString(),
		};
	});

	return {
		data,
		total,
		page,
		pageSize,
		totalPages,
		hasMore: page < totalPages,
		nextPage: page < totalPages ? page + 1 : null,
	};
}

export const DUMMY_TX_HISTORY = generateTxHistory;
