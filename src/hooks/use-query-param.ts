"use client";

import { useCallback, useSyncExternalStore } from "react";

// ─── Internal Event Bus ─────────────────────────────────────────────
// Custom event dispatched after every programmatic URL change so all
// subscribers update synchronously in the same microtask.

const QP_CHANGE = "__qp";

function emit() {
	window.dispatchEvent(new Event(QP_CHANGE));
}

function subscribe(cb: () => void) {
	window.addEventListener("popstate", cb);
	window.addEventListener(QP_CHANGE, cb);
	return () => {
		window.removeEventListener("popstate", cb);
		window.removeEventListener(QP_CHANGE, cb);
	};
}

// ─── Low-Level Helpers ──────────────────────────────────────────────

function readParam(key: string): string | null {
	return new URLSearchParams(window.location.search).get(key);
}

function buildUrl(params: URLSearchParams): string {
	const qs = params.toString();
	return qs
		? `${window.location.pathname}?${qs}${window.location.hash}`
		: `${window.location.pathname}${window.location.hash}`;
}

// ─── Public Imperative API ──────────────────────────────────────────

/**
 * Synchronously update one or more query params in the URL.
 * Pass `null` to remove a param. Uses `history.replaceState` by default
 * (zero latency, no React transition). Set `push: true` to add a
 * history entry (enables browser back-button undo).
 */
export function setQueryParams(
	updates: Record<string, string | null>,
	options?: { push?: boolean },
) {
	const params = new URLSearchParams(window.location.search);

	for (const [key, value] of Object.entries(updates)) {
		if (value === null || value === undefined || value === "") {
			params.delete(key);
		} else {
			params.set(key, value);
		}
	}

	const url = buildUrl(params);

	if (options?.push) {
		window.history.pushState(null, "", url);
	} else {
		window.history.replaceState(null, "", url);
	}

	emit();
}

// ─── Hooks ──────────────────────────────────────────────────────────

/**
 * Sync a **single** URL query param with React state.
 *
 * ```tsx
 * const [tab, setTab] = useQueryParam("tab", "overview");
 * // URL: ?tab=overview  →  tab === "overview"
 * // setTab("settings") →  URL becomes ?tab=settings (instant)
 * // setTab(null)        →  removes ?tab from URL
 * ```
 *
 * Zero latency: `history.replaceState` is synchronous; the URL bar
 * updates in the same call-stack frame as the state change.
 */
export function useQueryParam(
	key: string,
	defaultValue: string | null = null,
): [string | null, (value: string | null) => void] {
	const value = useSyncExternalStore(
		subscribe,
		() => readParam(key) ?? defaultValue,
		() => defaultValue,
	);

	const setValue = useCallback(
		(v: string | null) => setQueryParams({ [key]: v }),
		[key],
	);

	return [value, setValue];
}

/**
 * Sync **multiple** URL query params with React state.
 *
 * ```tsx
 * const [params, setParams] = useQueryParams({ tab: "overview", page: "1" });
 * // params.tab === "overview", params.page === "1"
 * // setParams({ tab: "settings" })  →  only updates ?tab
 * // setParams({ page: null })       →  removes ?page
 * ```
 */
export function useQueryParams<T extends Record<string, string>>(
	defaults: T,
): [T, (updates: Partial<Record<keyof T, string | null>>) => void] {
	const keys = Object.keys(defaults);

	const snapshot = useSyncExternalStore(
		subscribe,
		() => {
			const sp = new URLSearchParams(window.location.search);
			const result: Record<string, string> = {};
			for (const key of keys) {
				result[key] = sp.get(key) ?? defaults[key];
			}
			return JSON.stringify(result);
		},
		() => JSON.stringify(defaults),
	);

	const values = JSON.parse(snapshot) as T;

	const setValues = useCallback(
		(updates: Partial<Record<keyof T, string | null>>) => {
			setQueryParams(updates as Record<string, string | null>);
		},
		[],
	);

	return [values, setValues];
}
