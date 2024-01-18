import { create } from "zustand";

type CardModalStoreType = {
  cardId?: string;
  isOpen: boolean;
  onOpen: (cardId: string) => void;
  onClose: () => void;
};

export const useCardModalStore = create<CardModalStoreType>((set) => ({
  cardId: undefined,
  isOpen: false,
  onOpen: (cardId: string) => {
    set({ isOpen: true, cardId });
  },
  onClose: () => {
    set({ isOpen: false, cardId: undefined });
  },
}));
