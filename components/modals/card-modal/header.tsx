"use client";

import { BoardCardUpdateAction } from "@/actions/update-board-card";
import { FormInput } from "@/components/forms/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { BoardCardWithBoardList, BoardCardWithBoardListTitle } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface Props {
  cardWithList: BoardCardWithBoardListTitle;
}

const Header = ({ cardWithList }: Props) => {
  const inputRef = useRef<ElementRef<"input">>(null);
  const queryClient = useQueryClient();
  const params = useParams();

  const [title, setTitle] = useState(cardWithList.title);
  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };
  const { execute } = useAction(BoardCardUpdateAction, {
    onSuccess: (card) => {
      queryClient.invalidateQueries({
        queryKey: ["card", card.id],
      });
      toast.success(`Renamed to "${card.title}"`);
      setTitle(card.title);
    },
    onError: (error) => {
      console.log(error);

      toast.error(error);
    },
  });
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    if (title === cardWithList.title) {
      return;
    }
    execute({
      title,
      cardId: cardWithList.id,
      boardId: params.boardId as string,
    });
  };
  return (
    <div className="mb-6 flex w-full items-start gap-x-3">
      <Layout className="mt-1 h-5 w-5 text-neutral-700" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            id="title"
            ref={inputRef}
            defaultValue={title}
            onBlur={onBlur}
            className="tetx-sl relative -left-1.5 mb-0.5 w-[95%] truncate border-transparent bg-transparent px-1 font-semibold text-neutral-700 focus-visible:border-input focus-visible:bg-white"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          in list{" "}
          <span className="underline">{cardWithList.boardList.title}</span>
        </p>
      </div>
    </div>
  );
};

export default Header;

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="mb-6 flex items-start gap-x-3">
      <Skeleton className="mt-1 h-6 w-6 bg-neutral-200" />
      <div>
        <Skeleton className="mb-1 h-6 w-24 bg-neutral-200" />
        <Skeleton className="mb-1 h-4 w-12 bg-neutral-200" />
      </div>
    </div>
  );
};
