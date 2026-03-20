import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createUISlice } from "./slices/ui.slice";
import type { AppStore } from "./store.types";
import { APP_CONFIG } from "@/config/app.config";

export const useAppStore = create<AppStore>()(
	devtools(
		(...a) => ({
			...createUISlice(...a),
		}),
		{ name: APP_CONFIG.storeKeys.app },
	),
);
