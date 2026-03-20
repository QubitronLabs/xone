const CRYPTO_DECIMALS: Record<string, number> = {
	BTC: 8,
	ETH: 6,
	USDT: 2,
	USDC: 2,
	SOL: 4,
	BNB: 4,
};

/**
 * Format a cryptocurrency amount with appropriate decimal precision.
 */
export function formatCrypto(amount: number, symbol: string): string {
	const decimals = CRYPTO_DECIMALS[symbol.toUpperCase()] ?? 4;
	return `${amount.toFixed(decimals)} ${symbol.toUpperCase()}`;
}

/**
 * Format a fiat currency amount.
 */
export function formatFiat(
	amount: number,
	currency = "USD",
	locale = "en-US",
): string {
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount);
}
