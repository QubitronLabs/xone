/**
 * Truncate a number to a specific number of decimal places without rounding.
 */
export function truncateToDecimals(value: number, decimals: number): number {
	const factor = Math.pow(10, decimals);
	return Math.trunc(value * factor) / factor;
}

/**
 * Format a number with locale-aware separators.
 */
export function formatNumber(
	value: number,
	options?: Intl.NumberFormatOptions & { locale?: string },
): string {
	const { locale = "en-US", ...formatOptions } = options ?? {};
	return new Intl.NumberFormat(locale, formatOptions).format(value);
}

/**
 * Format a compact number (e.g., 1.2K, 3.4M).
 */
export function formatCompact(value: number, locale = "en-US"): string {
	return new Intl.NumberFormat(locale, { notation: "compact" }).format(value);
}
