"use client";

import { BoardUpdateAction } from "@/actions/update-board";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Board } from "@prisma/client";
import { ElementRef, useOptimistic, useRef, useState } from "react";
import { toast } from "sonner";

interface Props {
  board: Board;
}

const BoardTitleForm = ({ board }: Props) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [optimisticBoard, updateOptimisticBoard] = useOptimistic(
    board,
    (state, newTitle) => {
      const boardUpated = { ...state, title: newTitle as string };
      return boardUpated;
    }
  );
  const { execute } = useAction(BoardUpdateAction, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" updated !`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 100);
  };
  const disableEditing = () => setIsEditing(false);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    updateOptimisticBoard(title);

    execute({
      title,
      id: board.id,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={optimisticBoard.title}
          className="h-7 border-none bg-transparent px-2 py-1 text-lg font-bold focus-visible:outline-none focus-visible:ring-transparent"
        />
      </form>
    );
  }
  return (
    <Button
      onClick={enableEditing}
      variant="transparent"
      className="h-auto w-auto px-2 py-1 text-lg font-bold"
    >
      {optimisticBoard.title}
    </Button>
  );
};

export default BoardTitleForm;
