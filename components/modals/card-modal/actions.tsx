"use client";

import { BoardCardCopyAction } from "@/actions/copy-board-card";
import { BoardCardDeleteAction } from "@/actions/delete-board-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { useCardModalStore } from "@/stores/use-card-modal";
import { BoardCardWithBoardListTitle } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface Props {
  card: BoardCardWithBoardListTitle;
}

const Actions = ({ card }: Props) => {
  const params = useParams();
  const cardModal = useCardModalStore();
  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    BoardCardCopyAction,
    {
      onSuccess: (card) => {
        toast.success(`Card ${card.title} copied successfully.`);
        cardModal.onClose();
      },
      onError: (error) => toast.error(error),
    }
  );
  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    BoardCardDeleteAction,
    {
      onSuccess: (card) => {
        toast.success(`Card ${card.title} deleted successfully.`);
        cardModal.onClose();
      },
      onError: (error) => toast.error(error),
    }
  );

  const onCopy = () => {
    executeCopyCard({
      boardId: params.boardId as string,
      cardId: card.id,
    });
  };

  const onDelete = () => {
    executeDeleteCard({
      boardId: params.boardId as string,
      cardId: card.id,
    });
  };

  return (
    <div className="mt-2 space-y-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        disabled={isLoadingCopy}
        onClick={onCopy}
        variant="gray"
        size="sm"
        className="w-full"
      >
        <Copy className="mr-2 h-4 w-4" />
        Copy
      </Button>
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        size="sm"
        variant="destructive"
        className="w-full"
      >
        <Trash className="mr-2 h-4 w-4" />
        Delete
      </Button>
    </div>
  );
};

export default Actions;

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="mt-2 space-y-2 ">
      <Skeleton className="h-4 w-20 bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
    </div>
  );
};
