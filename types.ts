import { BoardCard, BoardList } from "@prisma/client";

export type BoardListWithBoardCards = BoardList & {
  boardCards: BoardCard[];
};

export type BoardCardWithBoardList = BoardCard & {
  boardList: BoardList;
};
