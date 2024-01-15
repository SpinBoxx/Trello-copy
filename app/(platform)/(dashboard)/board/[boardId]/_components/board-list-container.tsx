"use client";

import { BoardListWithBoardCards } from "@/types";
import { BoardList } from "@prisma/client";
import BoardListForm from "./board-list-form";
import { useEffect, useState } from "react";
import BoardListItem from "./board-list-item";

interface Props {
  boardId: string;
  boardList: BoardListWithBoardCards[];
}

const BoardListContainer = ({ boardId, boardList }: Props) => {
  const [orderedBoardList, setOrderedBoardList] = useState(boardList);

  useEffect(() => {
    setOrderedBoardList(boardList);
  }, [boardList]);

  return (
    <ol className="flex h-full gap-x-3">
      {boardList.map((boardList, index) => (
        <BoardListItem key={boardList.id} index={index} boardList={boardList} />
      ))}
      <BoardListForm boardId={boardId} />
      <div className="w-1 flex-shrink-0" />
    </ol>
  );
};

export default BoardListContainer;
