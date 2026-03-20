import type { StateCreator } from "zustand";

export interface UISlice {
	isSidebarOpen: boolean;
	isMobileNavOpen: boolean;
	isRightSidebarOpen: boolean;
	activeModal: "wallet" | "search" | "login" | "register" | null;
	theme: "light" | "dark" | "system";
	toggleSidebar: () => void;
	setMobileNav: (open: boolean) => void;
	toggleRightSidebar: () => void;
	openModal: (modal: UISlice["activeModal"]) => void;
	closeModal: () => void;
	setTheme: (theme: UISlice["theme"]) => void;
}

export const createUISlice: StateCreator<UISlice, [], [], UISlice> = (set) => ({
	isSidebarOpen: true,
	isMobileNavOpen: false,
	isRightSidebarOpen: false,
	activeModal: null,
	theme: "system",
	toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
	setMobileNav: (open) => set({ isMobileNavOpen: open }),
	toggleRightSidebar: () =>
		set((s) => ({ isRightSidebarOpen: !s.isRightSidebarOpen })),
	openModal: (modal) => set({ activeModal: modal }),
	closeModal: () => set({ activeModal: null }),
	setTheme: (theme) => set({ theme }),
});
