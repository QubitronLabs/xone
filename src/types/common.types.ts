export type ID = string;

export type CurrencyCode =
	| "USD"
	| "EUR"
	| "GBP"
	| "BTC"
	| "ETH"
	| "USDT"
	| "USDC"
	| "SOL"
	| "BNB";

export type Locale =
	| "en"
	| "hi"
	| "ar"
	| "de"
	| "es"
	| "fr"
	| "it"
	| "ja"
	| "ko"
	| "ms"
	| "nl"
	| "pl"
	| "pt"
	| "ru"
	| "sv"
	| "th"
	| "tr"
	| "vi"
	| "zh";

export type SortDirection = "asc" | "desc";

export interface SelectOption<T = string> {
	label: string;
	value: T;
}

export interface DateRange {
	from: Date;
	to: Date;
}
