"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "../schemas/auth.schema";
import { useAuth } from "../hooks/useAuth";
import { useAppStore } from "@/store";
import { APP_CONFIG } from "@/config/app.config";
import { IMAGES } from "@/config/images.config";
import { AuthInput } from "./AuthInput";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function RegisterModal() {
	const activeModal = useAppStore((s) => s.activeModal);
	const openModal = useAppStore((s) => s.openModal);
	const closeModal = useAppStore((s) => s.closeModal);
	const { register: registerUser, isRegistering, registerError } = useAuth();
	const [termsAccepted, setTermsAccepted] = useState(false);
	const [termsError, setTermsError] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	const isOpen = activeModal === "register";

	const onSubmit = (data: RegisterFormData) => {
		if (!termsAccepted) {
			setTermsError(true);
			return;
		}
		setTermsError(false);
		registerUser({
			username: data.username,
			email: data.email,
			password: data.password,
		});
	};

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			closeModal();
			reset();
			setTermsAccepted(false);
			setTermsError(false);
		}
	};

	const switchToLogin = () => {
		reset();
		setTermsAccepted(false);
		setTermsError(false);
		openModal("login");
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent
				showCloseButton={false}
				className="h-auto max-h-[calc(100vh-2rem)] w-full max-w-[90dvw]! lg:max-w-5xl! 2xl:max-w-7xl! overflow-hidden rounded-[32px] border-0 p-0 ring-0 bg-(image:--gradient-system-auth-dialog)"
			>
				<DialogTitle className="sr-only">Registration</DialogTitle>

				{/* Custom close button */}
				<button
					type="button"
					onClick={() => {
						closeModal();
						reset();
						setTermsAccepted(false);
						setTermsError(false);
					}}
					className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
					aria-label="Close"
				>
					<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
						<path
							d="M1 1L17 17M17 1L1 17"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						/>
					</svg>
				</button>

				<div className="grid h-full grid-cols-1 lg:grid-cols-2">
					{/* Left — Form */}
					<div className="relative flex flex-col items-center justify-center px-8 py-12 sm:px-16 lg:px-20">
						{/* Background X pattern */}
						<div
							className="pointer-events-none absolute inset-0 opacity-[0.06] bg-size-[122%] bg-center bg-no-repeat"
							style={{
								backgroundImage: `url(${IMAGES.common.elements.xVariants.loginRegisterDesktop})`,
							}}
						/>

						<div className="relative z-10 flex w-full max-w-120 flex-col items-center">
							{/* X1 Logo */}
							<h1 className="font-notable text-[clamp(4rem,10vw,5.75rem)] leading-[clamp(2.75rem,7vw,4rem)]">
								<span className="bg-clip-text text-transparent bg-(image:--gradient-system-logo)">
									X
								</span>
								<span className="text-white">1</span>
							</h1>

							{/* Subtitle */}
							<p className="mt-10 text-center text-[clamp(1rem,2.6vw,1.5rem)] font-medium leading-[clamp(1rem,3.5vw,2rem)] tracking-[0.192px] text-system-text [font-variation-settings:var(--font-system-variation)]">
								Already have an account?{" "}
								<button
									type="button"
									onClick={switchToLogin}
									className="cursor-pointer bg-clip-text font-medium leading-[clamp(1rem,3.5vw,2rem)] text-transparent bg-(image:--gradient-system-text-brand) [font-variation-settings:var(--font-system-variation)]"
								>
									Log In
								</button>
							</p>

							{/* Form */}
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="mt-10 flex w-full flex-col"
							>
								<AuthInput
									type="text"
									placeholder="Username"
									autoComplete="username"
									error={errors.username?.message}
									{...register("username")}
								/>

								<div className="mt-6">
									<AuthInput
										type="email"
										placeholder="E-mail"
										autoComplete="email"
										error={errors.email?.message}
										{...register("email")}
									/>
								</div>

								<div className="mt-6">
									<AuthInput
										type="password"
										placeholder="Password"
										autoComplete="new-password"
										error={errors.password?.message}
										{...register("password")}
									/>
								</div>

								<div className="mt-6">
									<AuthInput
										type="password"
										placeholder="Repeat Password"
										autoComplete="new-password"
										error={errors.confirmPassword?.message}
										{...register("confirmPassword")}
									/>
								</div>

								{/* Terms Checkbox */}
								<div className="mt-8 flex items-start gap-4">
									{/* Custom checkbox matching Figma — 48x48 outer, 44x44 inner */}
									<button
										type="button"
										onClick={() => {
											setTermsAccepted(!termsAccepted);
											if (termsError)
												setTermsError(false);
										}}
										className="relative flex size-12 shrink-0 items-center justify-center rounded-[20px] p-0.5 shadow-[0px_8px_8px_rgba(0,0,0,0.04)] bg-(image:--gradient-system-glass-dense)"
									>
										<div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_2px_4px_rgba(187,177,226,0.04)]" />
										<div className="flex size-11 items-center justify-center rounded-[18px] bg-system-input shadow-[inset_0px_4px_4px_rgba(6,5,10,0.12)]">
											{termsAccepted && (
												<svg
													width="20"
													height="20"
													viewBox="0 0 24 24"
													fill="none"
													stroke="var(--color-system-primary-light)"
													strokeWidth="3"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<polyline points="20 6 9 17 4 12" />
												</svg>
											)}
										</div>
									</button>

									<p className="text-[clamp(0.875rem,2vw,1.125rem)] font-medium leading-[clamp(1.25rem,3vw,1.5rem)] text-system-muted [font-variation-settings:var(--font-system-variation)]">
										I agree with{" "}
										<span className="bg-(image:--gradient-system-text-brand) bg-clip-text text-transparent">
											Terms of Conditions{" "}
										</span>
										and confirm that I&apos;m at least 18
										years old
									</p>
								</div>
								{termsError && (
									<p className="mt-1.5 pl-16 text-sm font-medium text-red-400">
										You must accept the terms to continue
									</p>
								)}

								{/* Server Error */}
								{registerError && (
									<p className="mt-4 text-center text-sm font-medium text-red-400">
										{registerError instanceof Error
											? registerError.message
											: "Registration failed. Please try again."}
									</p>
								)}

								{/* Registration Button */}
								<button
									type="submit"
									disabled={isRegistering}
									className="mt-10 h-16 w-full rounded-[24px] border-2 border-system-border text-[clamp(1.125rem,2.5vw,1.25rem)] font-medium leading-5 text-white transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50 [font-variation-settings:var(--font-system-variation)] bg-(image:--gradient-system-brand-button)"
								>
									{isRegistering
										? "Creating account…"
										: "Registration"}
								</button>

								{/* OR Divider */}
								<div className="mt-8 flex items-center gap-4">
									<div className="h-px flex-1 bg-system-divider" />
									<span className="text-base font-medium leading-5 text-system-muted [font-variation-settings:var(--font-system-variation)]">
										OR
									</span>
									<div className="h-px flex-1 bg-system-divider" />
								</div>

								{/* Continue with Google */}
								<button
									type="button"
									className="mt-8 flex h-16 w-full items-center justify-center gap-3 rounded-[24px] border-2 border-system-border text-[clamp(1.125rem,2.5vw,1.25rem)] font-medium leading-5 text-system-muted shadow-[0px_8px_8px_rgba(0,0,0,0.04)] transition-opacity hover:opacity-90 [font-variation-settings:var(--font-system-variation)] bg-(image:--gradient-system-secondary)"
								>
									<svg
										width="28"
										height="28"
										viewBox="0 0 48 48"
										fill="none"
									>
										<path
											d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
											fill="#FFC107"
										/>
										<path
											d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
											fill="#FF3D00"
										/>
										<path
											d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
											fill="#4CAF50"
										/>
										<path
											d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
											fill="#1976D2"
										/>
									</svg>
									Continue with Google
								</button>
							</form>
						</div>
					</div>

					{/* Right — Branding (hidden on mobile) */}
					<div className="relative hidden overflow-hidden rounded-r-[32px] lg:block bg-(image:--gradient-system-auth-branding)">
						<div
							className="absolute inset-0 opacity-50 bg-cover bg-center"
							style={{
								backgroundImage: `url(${IMAGES.common.elements.spaceTerrianVariants.registerLoginDesktop})`,
							}}
						/>

						<div className="relative z-10 flex h-full flex-col items-center justify-center">
							<Image
								src={IMAGES.logos.xone}
								alt={APP_CONFIG.name}
								width={400}
								height={140}
								className="w-100 max-w-[80%]"
							/>
							<p className="mt-6 text-center text-[clamp(1.5rem,3vw,1.875rem)] font-notable uppercase tracking-widest text-system-muted">
								New Era Casino
							</p>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
