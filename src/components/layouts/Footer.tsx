"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
	footerSocialLinks,
	footerLinkGroups,
	cryptoProviderIcons,
	paymentProviderIcons,
} from "@/config/navigation";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";

function FooterLogo() {
	return (
		<Link href="/" className="inline-flex items-center gap-3">
			<div
				className="flex size-[clamp(40px,2.5vw+0.5rem,48px)] shrink-0 items-center justify-center rounded-t-system-base shadow-system-base"
				style={{ background: "var(--gradient-system-primary)" }}
			/>
			<span className="font-notable text-[clamp(28px,1.5rem+1vw,40px)] leading-none">
				<span
					className="bg-clip-text text-transparent"
					style={{
						backgroundImage: "var(--gradient-system-primary)",
					}}
				>
					X
				</span>
				<span className="text-white">1</span>
			</span>
		</Link>
	);
}

function SocialLink({
	href,
	icon,
	title,
}: {
	href: string;
	icon: string;
	title: string;
}) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={title}
			className="flex size-10 items-center justify-center rounded-full border-[1.6px] border-[rgba(105,98,134,0.48)] transition-colors hover:border-system-muted"
		>
			<Image src={icon} alt={title} width={16} height={16} />
		</a>
	);
}

export function Footer() {
	const t = useTranslations("footer");
	return (
		<footer className="mx-[clamp(16px,1.5vw,24px)] rounded-system-xl bg-(image:--gradient-system-surface) px-[clamp(20px,2vw+8px,48px)] py-[clamp(24px,2vw+8px,48px)] [font-variation-settings:var(--font-system-variation)]">
			{/* ── Main content: Info + Navigation ── */}
			<div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-[clamp(40px,5vw,80px)]">
				{/* Left column: Logo, description, social icons */}
				<div className="flex flex-col items-center gap-6 lg:max-w-[clamp(200px,20vw,360px)] lg:items-start lg:shrink-0">
					<FooterLogo />

					<p className="text-center text-[clamp(12px,0.7rem+0.1vw,13px)] leading-[1.48] font-normal text-system-dim-dark lg:text-left">
						{t("disclaimer")}
					</p>

					<div className="flex items-center gap-[clamp(8px,0.6vw+4px,16px)]">
						{footerSocialLinks.map((link) => (
							<SocialLink
								key={link.title}
								href={link.href}
								icon={link.icon}
								title={link.title}
							/>
						))}
					</div>
				</div>

				{/* ── Desktop: Navigation link columns ── */}
				<div className="hidden flex-1 gap-[clamp(32px,3vw,64px)] lg:flex">
					{footerLinkGroups.map((group) => (
						<div
							key={group.title}
							className="flex flex-1 flex-col gap-[clamp(16px,1vw+8px,24px)]"
						>
							<h3 className="text-[clamp(14px,0.85rem+0.1vw,16px)] font-medium leading-6 tracking-[0.32px] text-white">
								{t(group.title)}
							</h3>
							<ul className="flex flex-col gap-[clamp(6px,0.5vw+4px,8px)]">
								{group.links.map((link) => (
									<li key={link.title}>
										<Link
											href={link.href}
											className="text-[clamp(14px,0.85rem+0.1vw,16px)] font-medium leading-6 text-system-muted transition-colors hover:text-white"
										>
											{t(link.title)}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* ── Mobile: Accordion navigation ── */}
				<div className="w-full lg:hidden">
					<Accordion
						className="rounded-none border-none"
						defaultValue={["aboutUs"]}
					>
						{footerLinkGroups.map((group) => (
							<AccordionItem
								key={group.title}
								value={group.title}
								className="border-system-divider data-open:bg-transparent"
							>
								<AccordionTrigger className="text-[clamp(14px,0.85rem+0.1vw,16px)] font-medium text-white hover:no-underline">
									{t(group.title)}
								</AccordionTrigger>
								<AccordionContent className="[&_a]:no-underline!">
									<ul className="flex flex-col gap-3">
										{group.links.map((link) => (
											<li key={link.title}>
												<Link
													href={link.href}
													className="text-[clamp(14px,0.85rem+0.1vw,16px)] font-medium text-system-muted transition-colors hover:text-white"
												>
													{t(link.title)}
												</Link>
											</li>
										))}
									</ul>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>

			{/* ── Divider ── */}
			<div className="my-[clamp(24px,2vw+8px,32px)] h-px w-full bg-system-divider" />

			{/* ── Payment & Crypto provider icons ── */}
			<div className="flex flex-wrap items-center justify-center gap-[clamp(12px,1vw+8px,24px)] opacity-60">
				{cryptoProviderIcons.map((icon) => (
					<Image
						key={icon.alt}
						src={icon.src}
						alt={icon.alt}
						width={24}
						height={24}
						className="size-6"
					/>
				))}

				{paymentProviderIcons.map((icon) => (
					<Image
						key={icon.alt}
						src={icon.src}
						alt={icon.alt}
						width={icon.width}
						height={icon.height}
					/>
				))}
			</div>

			{/* ── Divider ── */}
			<div className="my-[clamp(24px,2vw+8px,32px)] h-px w-full bg-system-divider" />

			{/* ── Copyright ── */}
			<p className="text-center text-[clamp(12px,0.75rem+0.1vw,14px)] leading-6 tracking-[0.14px] text-system-muted">
				{t("copyright", { brand: "******" })}
			</p>
		</footer>
	);
}
