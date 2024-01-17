"use server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import {
  BoardListUpdateInputType,
  BoardListUpdateReturnType,
} from "./update-board-list-types";
import { BoardListUpdateSchema } from "./update-board-list-schema";

const handler = async (
  data: BoardListUpdateInputType
): Promise<BoardListUpdateReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const { title, boardId, boardListId } = data;
  let list;

  try {
    list = await prismadb.boardList.update({
      where: {
        id: boardListId,
        boardId,
        board: {
          orgId,
        },
      },
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      error: "Failed to update.",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: list,
  };
};

export const BoardListUpdateAction = createSafeAction(
  BoardListUpdateSchema,
  handler
);
