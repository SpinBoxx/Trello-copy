"use client";

import { BoardListWithBoardCards } from "@/types";
import { BoardList } from "@prisma/client";
import BoardListHeader from "./board-list-header";

interface Props {
  index: number;
  boardList: BoardListWithBoardCards;
}

const BoardListItem = ({ boardList, index }: Props) => {
  return (
    <li className="h-full w-72 shrink-0 select-none">
      <div className="w-full rounded-md bg-neutral-100 pb-2 shadow-md ">
        <BoardListHeader boardList={boardList} />
      </div>
    </li>
  );
};

export default BoardListItem;
