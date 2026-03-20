import type { ReactNode } from "react";
import { CasinoShell } from "@/components/layouts/CasinoShell";

export default function CasinoLayout({ children }: { children: ReactNode }) {
	return <CasinoShell>{children}</CasinoShell>;
}
