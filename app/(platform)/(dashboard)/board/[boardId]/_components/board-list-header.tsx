"use client";

import { BoardListUpdateAction } from "@/actions/update-board-list";
import { FormInput } from "@/components/forms/form-input";
import { useAction } from "@/hooks/use-action";
import { BoardList } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import BoardListOptions from "./board-list-options";

interface Props {
  boardList: BoardList;
}

const BoardListHeader = ({ boardList }: Props) => {
  const [boardTitle, setBoardTitle] = useState(boardList.title);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 200);
  };

  const disableEditing = () => setIsEditing(false);
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      console.log("ok");
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);
  const { fieldErrors, execute } = useAction(BoardListUpdateAction, {
    onSuccess: (boardList) => {
      setBoardTitle(boardList.title);
      toast.success(`Successfuly renamed to "${boardList.title}".`);
      disableEditing();
    },
    onError: (error) => toast.error(error),
  });

  const onBlur = () => formRef.current?.requestSubmit();

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    if (title === boardList.title) {
      return disableEditing();
    }
    execute({
      boardId: boardList.boardId,
      boardListId: boardList.id,
      title,
    });
  };

  return (
    <div className="flex items-start justify-between gap-x-2 px-2 pt-2 text-sm font-semibold">
      {isEditing ? (
        <form ref={formRef} action={onSubmit} className="flex-1 px-0.5">
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            placeholder="Enter list title..."
            errors={fieldErrors}
            defaultValue={boardTitle}
            className="h-7 truncate border-transparent bg-transparent px-2 py-1 text-sm font-medium transition hover:border-input focus:border-input focus:bg-white"
          />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="h-7 w-full border-transparent px-2.5 py-1 font-semibold "
        >
          {boardList.title}
        </div>
      )}
      <BoardListOptions boardList={boardList} onAddCard={() => {}} />
    </div>
  );
};

export default BoardListHeader;
