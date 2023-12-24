import { create } from "zustand";

type MobileSidebarInterface = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useMobileSidebarStore = create<MobileSidebarInterface>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true });
  },
  onClose: () => {
    set({
      isOpen: false,
    });
  },
}));
