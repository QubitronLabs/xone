"use client";

import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
	({ className, type, error, ...props }, ref) => {
		const [showPassword, setShowPassword] = useState(false);
		const isPassword = type === "password";

		return (
			<div className="w-full">
				{/* Outer gradient border wrapper */}
				<div
					className={cn(
						"relative rounded-[24px] p-0.5",
						"shadow-[0px_8px_8px_rgba(0,0,0,0.04)]",
						"bg-(image:--gradient-system-glass-dense)",
						error && "ring-2 ring-red-500/50",
					)}
				>
					{/* Inner shadow overlay on outer border */}
					<div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_2px_4px_rgba(187,177,226,0.04)]" />

					{/* Inner input container */}
					<div className="relative rounded-[22px] bg-[rgba(20,17,31,0.84)]">
						<div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_4px_4px_rgba(6,5,10,0.12)]" />
						<input
							ref={ref}
							type={isPassword && showPassword ? "text" : type}
							className={cn(
								"relative z-10 h-15 w-full rounded-[22px] bg-transparent px-6 text-[clamp(1rem,2.2vw,1.125rem)] font-medium text-white outline-none",
								"placeholder:text-system-placeholder",
								"font-(--font-system-primary)",
								"[font-variation-settings:var(--font-system-variation)]",
								isPassword && "pr-14",
								className,
							)}
							{...props}
						/>
						{isPassword && (
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute top-1/2 right-5 z-20 -translate-y-1/2 text-system-placeholder transition-colors hover:text-system-muted"
								tabIndex={-1}
							>
								<HugeiconsIcon
									icon={showPassword ? ViewOffIcon : ViewIcon}
									size={22}
									strokeWidth={1.5}
								/>
							</button>
						)}
					</div>
				</div>
				{error && (
					<p className="mt-1.5 pl-2 text-sm font-medium text-red-400">
						{error}
					</p>
				)}
			</div>
		);
	},
);

AuthInput.displayName = "AuthInput";
