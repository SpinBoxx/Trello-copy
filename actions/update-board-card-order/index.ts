"use server";

import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import {
  BoardCardOrderUpdateInputType,
  BoardCardOrderUpdateReturnType,
} from "./update-board-card-order-types";
import { BoardCardOrderUpdateSchema } from "./update-board-card-order-schema";

const handler = async (
  data: BoardCardOrderUpdateInputType
): Promise<BoardCardOrderUpdateReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const { cards, boardId } = data;
  let cardsReordered;
  try {
    const transaction = cards.map((card) =>
      prismadb.boardCard.update({
        where: {
          id: card.id,
          boardList: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          boardListId: card.boardListId,
        },
      })
    );

    cardsReordered = await prismadb.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder.",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: cardsReordered,
  };
};

export const BoardCardOrderUpdateAction = createSafeAction(
  BoardCardOrderUpdateSchema,
  handler
);
