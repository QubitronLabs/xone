import { defineRouting } from "next-intl/routing";

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

export const routing = defineRouting({
	locales,
	defaultLocale: "en",
	localePrefix: "always",
});
