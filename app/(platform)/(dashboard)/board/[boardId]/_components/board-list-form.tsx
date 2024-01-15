import { Button } from "@/components/ui/button";
import BoardListWrapper from "./board-list-wrapper";
import { Plus, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/forms/form-input";
import { FormSubmit } from "@/components/forms/form-submit";
import { useAction } from "@/hooks/use-action";
import { BoardListCreateAction } from "@/actions/create-board-list";
import { toast } from "sonner";

interface Props {
  boardId: string;
}

const BoardListForm = ({ boardId }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const { execute, fieldErrors } = useAction(BoardListCreateAction, {
    onSuccess: (boardList) => {
      toast.success(`List "${boardList.title}" created.`);
      disableEditing();
    },
    onError: (error) => toast.error(error),
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({
      title,
      boardId,
    });
  };

  if (isEditing) {
    return (
      <BoardListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full space-y-4 rounded-md bg-white p-3 shadow-md"
        >
          <FormInput
            id="title"
            ref={inputRef}
            errors={fieldErrors}
            className="h-7 border-transparent px-2 py-1 text-sm font-medium transition hover:border-input focus:border-input"
            placeholder="Enter list title..."
          />
          <div className="flex items-center  gap-x-1">
            <FormSubmit>Add list</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </BoardListWrapper>
    );
  }

  return (
    <BoardListWrapper>
      <button
        onClick={enableEditing}
        className="flex w-full items-center justify-start rounded-md bg-white/80 p-3 text-sm font-medium text-neutral-800 transition hover:bg-white/50 "
      >
        <Plus className="mr-2 h-4 w-4" />
        Add a list
      </button>
    </BoardListWrapper>
  );
};

export default BoardListForm;
