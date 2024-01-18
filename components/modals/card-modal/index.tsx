"use client";

import { GetCardAction } from "@/actions/get-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useCardModalStore } from "@/stores/use-card-modal";
import { useQuery } from "@tanstack/react-query";
import Header from "./header";

const CardModal = () => {
  const { isOpen, onClose, cardId } = useCardModalStore();

  const { data: cardData, isLoading } = useQuery({
    queryKey: ["card", cardId ?? "53ca7cdf-711e-4606-bb8d-689a622f6cff"],
    queryFn: () => {
      if (cardId) return GetCardAction(cardId);
    },
  });

  if (cardData?.error) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{cardData.error}</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          {cardData && cardData.card ? (
            <Header cardWithList={cardData.card} />
          ) : (
            <Header.Skeleton />
          )}
        </DialogHeader>
        <div></div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
