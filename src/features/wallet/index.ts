export { WalletModal } from "./components/WalletModal";
export { OverviewTab } from "./components/OverviewTab";
export { DepositTab } from "./components/DepositTab";
export { WithdrawTab } from "./components/WithdrawTab";
export { SwapTab } from "./components/SwapTab";
export { TipModal } from "./components/TipModal";
// Business-logic hooks
export { useBalance, useTxHistory } from "./hooks/useBalance";
export { useDeposit } from "./hooks/useDeposit";
export { useWithdraw } from "./hooks/useWithdraw";
export { useSwap } from "./hooks/useSwap";
// TanStack Query wrappers
export {
	walletKeys,
	walletQueries,
	useWalletBalanceQuery,
	useTxHistoryQuery,
	useSwapQuoteQuery,
	useDepositMutation,
	useWithdrawMutation,
	useExecuteSwapMutation,
	useInvalidateWallet,
} from "./queries/wallet.queries";
export { useWalletStore } from "./store/wallet.slice";
export type {
	WalletToken,
	TxHistory,
	SwapQuote,
	DepositRequest,
	WithdrawRequest,
} from "./types";
