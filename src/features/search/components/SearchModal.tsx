"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useSearch } from "../hooks/useSearch";
import { SearchResults } from "./SearchResults";
import { useAppStore } from "@/store";
import type { Game } from "@/features/games/types";

export function SearchModal() {
	const t = useTranslations("search");
	const [query, setQuery] = useState("");
	const { activeModal, openModal, closeModal } = useAppStore();
	const inputRef = useRef<HTMLInputElement>(null);
	const { data: results = [], isLoading } = useSearch(query);

	const isOpen = activeModal === "search";

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => inputRef.current?.focus(), 50);
		} else {
			setQuery("");
		}
	}, [isOpen]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				if (isOpen) closeModal();
				else openModal("search");
			}
			if (e.key === "Escape" && isOpen) {
				closeModal();
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, openModal, closeModal]);

	if (!isOpen) return null;

	const handleSelect = (_game: Game) => {
		closeModal();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
			<div
				className="fixed inset-0 bg-black/60"
				onClick={() => closeModal()}
				onKeyDown={() => {}}
				role="presentation"
			/>
			<div className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card shadow-xl">
				<div className="flex items-center border-b border-border px-4">
					<svg
						className="h-5 w-5 text-muted-foreground"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<circle cx="11" cy="11" r="8" />
						<path d="m21 21-4.35-4.35" />
					</svg>
					<input
						ref={inputRef}
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder={t("placeholder")}
						className="flex-1 bg-transparent px-3 py-4 text-sm outline-none placeholder:text-muted-foreground"
					/>
					<kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
						{t("escKey")}
					</kbd>
				</div>
				<SearchResults
					results={results}
					isLoading={isLoading}
					query={query}
					onSelect={handleSelect}
				/>
			</div>
		</div>
	);
}
