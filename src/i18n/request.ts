import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { cookies } from "next/headers";
import { routing } from "./routing";
import { APP_CONFIG } from "@/config/app.config";

export default getRequestConfig(async ({ requestLocale }) => {
	const requested = await requestLocale;
	const cookieStore = await cookies();
	const preferredLocale = cookieStore.get(
		APP_CONFIG.storageKeys.locale,
	)?.value;

	let locale: string;
	if (preferredLocale && hasLocale(routing.locales, preferredLocale)) {
		locale = preferredLocale;
	} else if (hasLocale(routing.locales, requested)) {
		locale = requested!;
	} else {
		locale = routing.defaultLocale;
	}

	return {
		locale,
		messages: (await import(`../../messages/${locale}.json`)).default,
	};
});
