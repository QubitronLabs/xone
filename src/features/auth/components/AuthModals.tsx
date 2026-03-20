"use client";

import { useEffect, useRef } from "react";
import { useQueryParam } from "@/hooks/use-query-param";
import { useAppStore } from "@/store";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";

type AuthModal = "login" | "register";
const AUTH_MODALS: ReadonlySet<string> = new Set<AuthModal>([
	"login",
	"register",
]);

function isAuthModal(v: string | null): v is AuthModal {
	return v !== null && AUTH_MODALS.has(v);
}

export function AuthModals() {
	const [modalParam, setModalParam] = useQueryParam("modal");
	const activeModal = useAppStore((s) => s.activeModal);
	const openModal = useAppStore((s) => s.openModal);
	const closeModal = useAppStore((s) => s.closeModal);

	// Guard against sync loops: track who triggered the last change
	const sourceRef = useRef<"url" | "store" | null>(null);

	// URL → Store: when ?modal changes (back button, direct URL, etc.)
	useEffect(() => {
		if (sourceRef.current === "store") {
			sourceRef.current = null;
			return;
		}
		sourceRef.current = "url";
		if (isAuthModal(modalParam)) {
			if (activeModal !== modalParam) openModal(modalParam);
		} else if (isAuthModal(activeModal as string)) {
			closeModal();
		}
	}, [modalParam]); // eslint-disable-line react-hooks/exhaustive-deps

	// Store → URL: when activeModal changes via openModal/closeModal
	useEffect(() => {
		if (sourceRef.current === "url") {
			sourceRef.current = null;
			return;
		}
		sourceRef.current = "store";
		if (isAuthModal(activeModal as string)) {
			if (modalParam !== activeModal)
				setModalParam(activeModal as string);
		} else if (isAuthModal(modalParam)) {
			setModalParam(null);
		}
	}, [activeModal]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<LoginModal />
			<RegisterModal />
		</>
	);
}
