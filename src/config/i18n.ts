export const locales = [
	"en",
	"hi",
	"ar",
	"de",
	"es",
	"fr",
	"it",
	"ja",
	"ko",
	"ms",
	"nl",
	"pl",
	"pt",
	"ru",
	"sv",
	"th",
	"tr",
	"vi",
	"zh",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
	en: "English",
	hi: "हिन्दी",
	ar: "العربية",
	de: "Deutsch",
	es: "Español",
	fr: "Français",
	it: "Italiano",
	ja: "日本語",
	ko: "한국어",
	ms: "Bahasa Melayu",
	nl: "Nederlands",
	pl: "Polski",
	pt: "Português",
	ru: "Русский",
	sv: "Svenska",
	th: "ไทย",
	tr: "Türkçe",
	vi: "Tiếng Việt",
	zh: "中文",
};

export const rtlLocales: Locale[] = ["ar"];
