"use client";

import { BoardListWithBoardCards } from "@/types";
import { BoardList } from "@prisma/client";

interface Props {
  boardId: string;
  boardList: BoardListWithBoardCards[];
}

const BoardListContainer = ({ boardId, boardList }: Props) => {
  return <div>test</div>;
};

export default BoardListContainer;
