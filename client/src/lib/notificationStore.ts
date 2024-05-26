import { create } from "zustand";
import apiRequest from "./apiRequest";

interface ChatState {
	number: number;
	fetch: () => void;
	decrease: () => void;
	reset: () => void;
}

export const useStore = create<ChatState>((set) => ({
	number: 0,
	fetch: async () => {
		const res = await apiRequest("user/read/notification");
		set({ number: res.data });
	},
	decrease: () => {
		set((prev) => ({ number: prev.number - 1 }));
	},
	reset: () => {
		set({ number: 0 });
	},
}));
