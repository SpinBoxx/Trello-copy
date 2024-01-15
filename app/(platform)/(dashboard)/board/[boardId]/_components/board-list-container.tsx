"use client";

import { BoardListWithBoardCards } from "@/types";
import { BoardList } from "@prisma/client";
import BoardListForm from "./board-list-form";

interface Props {
  boardId: string;
  boardList: BoardListWithBoardCards[];
}

const BoardListContainer = ({ boardId, boardList }: Props) => {
  return (
    <ol>
      <BoardListForm boardId={boardId} />
      <div className="w-1 flex-shrink-0" />
    </ol>
  );
};

export default BoardListContainer;
