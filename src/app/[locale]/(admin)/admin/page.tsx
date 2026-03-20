import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Admin Panel",
};

export default function AdminRootPage() {
	redirect("admin/users");
}
