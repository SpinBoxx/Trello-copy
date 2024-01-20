"use client";

import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormSubmit } from "@/components/forms/form-submit";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { FormTextarea } from "@/components/forms/form-textarea";
import { BoardCardCreateAction } from "@/actions/create-board-card";
import { useParams } from "next/navigation";

interface Props {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

const BoardCardForm = forwardRef<HTMLTextAreaElement, Props>(
  ({ disableEditing, enableEditing, isEditing, listId }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };
    const { execute, fieldErrors } = useAction(BoardCardCreateAction, {
      onSuccess: (boardCard) => {
        toast.success(`Card "${boardCard.title}" created.`);
        formRef.current?.reset();
        disableEditing();
      },
      onError: (error) => toast.error(error),
    });
    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextareatKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };
    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      execute({
        title,
        boardId: params.boardId as string,
        boardListId: listId,
      });
    };

    if (isEditing)
      return (
        <form
          ref={formRef}
          action={onSubmit}
          className="m-1 space-y-4 px-1 py-0.5"
        >
          <FormTextarea
            id="title"
            onKeyDown={onTextareatKeyDown}
            ref={ref}
            placeholder="Enter a title for this card..."
            className=""
            errors={fieldErrors}
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add card</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );

    return (
      <div className="px-2 pt-2 ">
        <Button
          onClick={enableEditing}
          className="h-auto w-full justify-start px-2 py-1.5 text-sm text-muted-foreground"
          size="sm"
          variant="ghost"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add a card
        </Button>
      </div>
    );
  }
);

BoardCardForm.displayName = "BoardCardForm";
export default BoardCardForm;
