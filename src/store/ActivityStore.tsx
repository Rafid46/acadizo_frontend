import { create } from "zustand";

interface ActivityStore {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  resetFormSignal: boolean;
  triggerFormReset: () => void;
}
export const useActivityStore = create<ActivityStore>((set) => ({
  selectedFile: null,
  setSelectedFile: (file) => set({ selectedFile: file }),
  resetFormSignal: false,
  triggerFormReset: () =>
    set((state) => ({ resetFormSignal: !state.resetFormSignal })),
}));
