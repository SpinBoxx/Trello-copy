"use client";

import { BoardListCopyAction } from "@/actions/copy-board-list";
import { BoardListDeleteAction } from "@/actions/delete-board-list";
import { BoardListDeleteSchema } from "@/actions/delete-board-list/update-board-list-schema";
import { FormSubmit } from "@/components/forms/form-submit";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { BoardList } from "@prisma/client";
import { Copy, MoreHorizontal, Plus, Trash, X } from "lucide-react";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

interface Props {
  boardList: BoardList;
  onAddCard: () => void;
}

const BoardListOptions = ({ boardList, onAddCard }: Props) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDeleteBoardList } = useAction(BoardListDeleteAction, {
    onSuccess: (boardList) => {
      toast.success(`List "${boardList.title}" successfully deleted.`);
    },
    onError: (error) => toast.error(error),
  });
  const onDelete = () => {
    executeDeleteBoardList({
      boardId: boardList.boardId,
      boardListId: boardList.id,
    });
  };

  const { execute: executeCopyBoardList } = useAction(BoardListCopyAction, {
    onSuccess: (boardList) => {
      toast.success(`List "${boardList.title}" successfully copied.`);
      closeRef.current?.click();
    },
    onError: (error) => toast.error(error),
  });
  const onCopy = () => {
    executeCopyBoardList({
      boardId: boardList.boardId,
      boardListId: boardList.id,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="pb-4 text-center text-sm font-medium text-neutral-800">
          List actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="absolute right-2 top-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          className="h-auto w-full justify-start rounded-none px-5 py-2 text-sm font-normal"
          onClick={onAddCard}
          variant="ghost"
        >
          <Plus className="mr-2 h-4 w-4" /> Add card
        </Button>
        <form action={onCopy}>
          <FormSubmit
            className="h-auto w-full justify-start rounded-none px-5 py-2 text-sm font-normal"
            variant="ghost"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy list
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <FormSubmit
            className="h-auto w-full justify-start rounded-none px-5 py-2 text-sm font-normal text-red-600  hover:text-red-600"
            variant="ghost"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default BoardListOptions;
