"use server";

import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import {
  BoardListOrderUpdateInputType,
  BoardListOrderUpdateReturnType,
} from "./update-board-list-order-types";
import { BoardListOrderUpdateSchema } from "./update-board-list-order-schema";

const handler = async (
  data: BoardListOrderUpdateInputType
): Promise<BoardListOrderUpdateReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const { boardId, lists } = data;
  let listsReordered;
  try {
    const transaction = lists.map((list) =>
      prismadb.boardList.update({
        where: {
          id: list.id,
          board: {
            orgId,
          },
        },
        data: {
          order: list.order,
        },
      })
    );

    listsReordered = await prismadb.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder.",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: listsReordered,
  };
};

export const BoardListOrderUpdateAction = createSafeAction(
  BoardListOrderUpdateSchema,
  handler
);
