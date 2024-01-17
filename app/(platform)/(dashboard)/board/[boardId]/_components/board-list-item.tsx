"use client";

import { BoardListWithBoardCards } from "@/types";
import { BoardList } from "@prisma/client";
import BoardListHeader from "./board-list-header";
import { ElementRef, useRef, useState } from "react";
import BoardCardForm from "./board-card-form";
import { cn } from "@/lib/utils";
import BoardCardItem from "./board-card-item";

interface Props {
  index: number;
  boardList: BoardListWithBoardCards;
}

const BoardListItem = ({ boardList, index }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  return (
    <li className="h-full w-72 shrink-0 select-none">
      <div className="w-full rounded-md bg-neutral-100 pb-2 shadow-md ">
        <BoardListHeader boardList={boardList} />
        <ol
          className={cn(
            "mx-1 flex flex-col gap-y-2 px-1 py-0.5",
            boardList.boardCards.length > 0 ? "mt-2" : "mt-0"
          )}
        >
          {boardList.boardCards.map((card, index) => (
            <BoardCardItem key={card.id} card={card} index={index} />
          ))}
        </ol>
        <BoardCardForm
          listId={boardList.id}
          disableEditing={disableEditing}
          enableEditing={enableEditing}
          isEditing={isEditing}
          ref={textareaRef}
        />
      </div>
    </li>
  );
};

export default BoardListItem;
