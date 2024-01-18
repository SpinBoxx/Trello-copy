import { BoardCard, BoardList } from "@prisma/client";

export type BoardListWithBoardCards = BoardList & {
  boardCards: BoardCard[];
};

export type BoardCardWithBoardList = BoardCard & {
  boardList: BoardList;
};

export type BoardCardWithBoardListTitle = BoardCard & {
  boardList: {
    title: string;
  };
};
