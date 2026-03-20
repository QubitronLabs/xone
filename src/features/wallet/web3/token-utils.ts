/**
 * Format a raw token balance by applying decimals.
 */
export function formatTokenBalance(
	rawBalance: bigint,
	decimals: number,
): string {
	const divisor = BigInt(10 ** decimals);
	const intPart = rawBalance / divisor;
	const fracPart = rawBalance % divisor;
	const fracStr = fracPart
		.toString()
		.padStart(decimals, "0")
		.slice(0, 6)
		.replace(/0+$/, "");
	return fracStr ? `${intPart}.${fracStr}` : intPart.toString();
}

/**
 * Parse a human-readable token amount to raw bigint value.
 */
export function parseTokenAmount(amount: string, decimals: number): bigint {
	const [intPart, fracPart = ""] = amount.split(".");
	const paddedFrac = fracPart.padEnd(decimals, "0").slice(0, decimals);
	return BigInt(intPart + paddedFrac);
}

/**
 * Shorten an Ethereum address for display.
 */
export function shortenAddress(address: string, start = 6, end = 4): string {
	if (address.length <= start + end) return address;
	return `${address.slice(0, start)}…${address.slice(-end)}`;
}

/**
 * Shorten a transaction hash for display.
 */
export function shortenTxHash(hash: string): string {
	return shortenAddress(hash, 10, 8);
}
