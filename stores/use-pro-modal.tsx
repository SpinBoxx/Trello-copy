import { create } from "zustand";

type ProModalStoreType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useProModalStore = create<ProModalStoreType>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true });
  },
  onClose: () => {
    set({ isOpen: false });
  },
}));
