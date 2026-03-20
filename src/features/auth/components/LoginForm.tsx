"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/auth.schema";
import { useAuth } from "../hooks/useAuth";

export function LoginForm() {
	const { login, isLoggingIn, loginError } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = (data: LoginFormData) => {
		login(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div className="space-y-2">
				<label
					htmlFor="email"
					className="text-sm font-medium text-foreground"
				>
					Email
				</label>
				<input
					id="email"
					type="email"
					autoComplete="email"
					className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					placeholder="you@example.com"
					{...register("email")}
				/>
				{errors.email && (
					<p className="text-sm text-destructive">
						{errors.email.message}
					</p>
				)}
			</div>

			<div className="space-y-2">
				<label
					htmlFor="password"
					className="text-sm font-medium text-foreground"
				>
					Password
				</label>
				<input
					id="password"
					type="password"
					autoComplete="current-password"
					className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					placeholder="••••••••"
					{...register("password")}
				/>
				{errors.password && (
					<p className="text-sm text-destructive">
						{errors.password.message}
					</p>
				)}
			</div>

			{loginError && (
				<p className="text-sm text-destructive">
					{loginError instanceof Error
						? loginError.message
						: "Login failed"}
				</p>
			)}

			<button
				type="submit"
				disabled={isLoggingIn}
				className="flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
			>
				{isLoggingIn ? "Signing in…" : "Sign in"}
			</button>
		</form>
	);
}
