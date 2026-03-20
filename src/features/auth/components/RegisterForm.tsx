"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "../schemas/auth.schema";
import { useAuth } from "../hooks/useAuth";

export function RegisterForm() {
	const { register: registerUser, isRegistering, registerError } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = (data: RegisterFormData) => {
		registerUser({
			username: data.username,
			email: data.email,
			password: data.password,
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div className="space-y-2">
				<label
					htmlFor="username"
					className="text-sm font-medium text-foreground"
				>
					Username
				</label>
				<input
					id="username"
					type="text"
					autoComplete="username"
					className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					placeholder="cooluser123"
					{...register("username")}
				/>
				{errors.username && (
					<p className="text-sm text-destructive">
						{errors.username.message}
					</p>
				)}
			</div>

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
					autoComplete="new-password"
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

			<div className="space-y-2">
				<label
					htmlFor="confirmPassword"
					className="text-sm font-medium text-foreground"
				>
					Confirm Password
				</label>
				<input
					id="confirmPassword"
					type="password"
					autoComplete="new-password"
					className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					placeholder="••••••••"
					{...register("confirmPassword")}
				/>
				{errors.confirmPassword && (
					<p className="text-sm text-destructive">
						{errors.confirmPassword.message}
					</p>
				)}
			</div>

			{registerError && (
				<p className="text-sm text-destructive">
					{registerError instanceof Error
						? registerError.message
						: "Registration failed"}
				</p>
			)}

			<button
				type="submit"
				disabled={isRegistering}
				className="flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
			>
				{isRegistering ? "Creating account…" : "Create account"}
			</button>
		</form>
	);
}
