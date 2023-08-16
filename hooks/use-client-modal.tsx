import { create } from "zustand";

interface useClientModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useClientModal = create<useClientModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
