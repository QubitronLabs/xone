"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

interface ChatInputProps {
	onSend: (content: string) => void;
	disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
	const t = useTranslations("chat");
	const [value, setValue] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!value.trim()) return;
		onSend(value);
		setValue("");
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex gap-2 border-t border-border p-3"
		>
			<input
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder={t("placeholder")}
				disabled={disabled}
				className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:opacity-50"
				maxLength={500}
			/>
			<button
				type="submit"
				disabled={disabled || !value.trim()}
				className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
			>
				{t("send")}
			</button>
		</form>
	);
}
