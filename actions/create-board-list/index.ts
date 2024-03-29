"use server";

import { auth } from "@clerk/nextjs";
import {
  BoardListCreateInputType,
  BoardListCreateReturnType,
} from "./create-board-list-types";
import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { BoardListCreateSchema } from "./create-board-list-schema";
import { createAuditLog } from "@/services/audit-log/create-audit-log";

const handler = async (
  data: BoardListCreateInputType
): Promise<BoardListCreateReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const { title, boardId } = data;
  let list;

  try {
    const board = await prismadb.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    });

    if (!board) {
      return {
        error: "Board not found.",
      };
    }

    const lastBoardList = await prismadb.boardList.findFirst({
      where: {
        boardId,
      },
      orderBy: {
        order: "desc",
      },
      select: { order: true },
    });

    const newOrder = lastBoardList ? lastBoardList.order + 1 : 1;

    list = await prismadb.boardList.create({
      data: {
        title,
        order: newOrder,
        boardId,
      },
    });

    await createAuditLog({
      action: "CREATE",
      entityId: list.id,
      entityTitle: list.title,
      entityType: "LIST",
    });
  } catch (error) {
    return {
      error: "Failed to create the list.",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: list,
  };
};

export const BoardListCreateAction = createSafeAction(
  BoardListCreateSchema,
  handler
);
