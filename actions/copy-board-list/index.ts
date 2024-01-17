"use server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import {
  BoardListCopyInputType,
  BoardListCopyReturnType,
} from "./copy-board-list-types";
import { BoardListCopySchema } from "./copy-board-list-schema";

const handler = async (
  data: BoardListCopyInputType
): Promise<BoardListCopyReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const { boardId, boardListId } = data;
  let list;

  try {
    const boardListToCopy = await prismadb.boardList.findUnique({
      where: {
        id: boardListId,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        boardCards: true,
      },
    });
    if (!boardListToCopy)
      return {
        error: "List not found.",
      };

    const lastBoardList = await prismadb.boardList.findFirst({
      where: { boardId },
      orderBy: { order: "asc" },
      select: { order: true },
    });

    const newOrder = lastBoardList ? lastBoardList.order + 1 : 1;

    list = await prismadb.boardList.create({
      data: {
        boardId: boardListToCopy.boardId,
        title: `${boardListToCopy.title} - Copy`,
        order: newOrder,
        boardCards: {
          createMany: { data: boardListToCopy.boardCards },
        },
      },
      include: {
        boardCards: true,
      },
    });
  } catch (error) {
    return {
      error: "Failed to copy.",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: list,
  };
};

export const BoardListCopyAction = createSafeAction(
  BoardListCopySchema,
  handler
);
