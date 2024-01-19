"use client";

import { BoardCardUpdateAction } from "@/actions/update-board-card";
import { FormSubmit } from "@/components/forms/form-submit";
import { FormTextarea } from "@/components/forms/form-textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { BoardCardWithBoardList, BoardCardWithBoardListTitle } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft, X } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface Props {
  card: BoardCardWithBoardListTitle;
}

const Description = ({ card }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();
  const formRef = useRef<ElementRef<"form">>(null);
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const queryClient = useQueryClient();

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  const disableEditing = () => setIsEditing(false);
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  const { execute, fieldErrors } = useAction(BoardCardUpdateAction, {
    onSuccess: (card) => {
      queryClient.invalidateQueries({
        queryKey: ["card", card.id],
      });
      toast.success(`Card "${card.title}" updated.`);
    },
    onError: (error) => toast.error(error),
  });

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    execute({
      boardId: params.boardId as string,
      cardId: card.id,
      description,
    });
    disableEditing();
  };

  return (
    <div className="flex w-full items-start gap-x-3">
      <AlignLeft className="mt-0.5 h-5 w-5 text-neutral-700" />
      <div className="w-full ">
        <p className="mb-2 font-semibold text-neutral-700">Description</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef} className="space-y-2">
            <FormTextarea
              ref={textareaRef}
              className="mt-2 w-full"
              id="description"
              errors={fieldErrors}
              defaultValue={card.description || undefined}
            />
            <div className="flex items-center gap-x-2">
              <FormSubmit>Save</FormSubmit>
              <Button
                type="button"
                size="icon"
                onClick={disableEditing}
                variant="ghost"
              >
                <X />
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role="button"
            className="min-h-20 rounded-md bg-neutral-200 px-3.5 py-3 text-sm font-medium"
          >
            {card.description || "Add a more detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Description;

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex w-full items-start gap-x-3">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="sapce-y-2 w-full">
        <Skeleton className="h-6 w-24 bg-neutral-200" />
        <Skeleton className="h-20 w-full bg-neutral-200" />
      </div>
    </div>
  );
};
