"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { localeNames, localeFlags } from "@/config/i18n";
import { APP_CONFIG } from "@/config/app.config";
import { HugeiconsIcon } from "@hugeicons/react";
import { LanguageCircleIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

function setLocaleCookie(locale: string) {
	document.cookie = `${APP_CONFIG.storageKeys.locale}=${locale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
}

export function LanguageSelector() {
	const locale = useLocale();
	const router = useRouter();

	function handleLocaleChange(newLocale: Locale) {
		if (newLocale === locale) return;
		setLocaleCookie(newLocale);
		router.refresh();
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className="flex items-center gap-2 rounded-system-2xl bg-(image:--gradient-system-glass) px-3.5 py-2 shadow-system-base backdrop-blur-system-glass transition-all duration-200 hover:brightness-110 focus:outline-none [font-variation-settings:var(--font-system-variation)]"
				aria-label="Select language"
			>
				<HugeiconsIcon
					icon={LanguageCircleIcon}
					className="size-5 text-system-muted"
					strokeWidth={1.5}
				/>
				<span className="text-sm font-medium uppercase tracking-wide text-system-text">
					{locale}
				</span>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align="end"
				sideOffset={8}
				className="max-h-105 w-72 overflow-y-auto rounded-system-2xl bg-(image:--gradient-system-glass-opaque) p-2 shadow-system-base ring-1 ring-system-divider/30 backdrop-blur-system-glass system-scrollbar-thin system-scrollbar-themed [font-variation-settings:var(--font-system-variation)]"
			>
				{locales.map((loc) => {
					const isActive = loc === locale;
					return (
						<DropdownMenuItem
							key={loc}
							className={`flex cursor-pointer items-center gap-3 rounded-system-base px-3 py-3 text-base font-medium transition-colors duration-150 ${
								isActive
									? "bg-system-accent-soft text-system-white"
									: "text-system-text hover:bg-white/5"
							}`}
							onClick={() => handleLocaleChange(loc)}
						>
							<span className="text-2xl leading-none">
								{localeFlags[loc]}
							</span>
							<span className="flex-1">{localeNames[loc]}</span>
							<span className="text-xs uppercase text-system-muted">
								{loc}
							</span>
							{isActive && (
								<HugeiconsIcon
									icon={Tick02Icon}
									className="size-5 text-system-primary-light"
									strokeWidth={2}
								/>
							)}
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
