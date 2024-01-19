"use server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import {
  BoardCardCopyInputType,
  BoardCardCopyReturnType,
} from "./copy-board-card-types";
import { BoardCardCopySchema } from "./copy-board-card-schema";

const handler = async (
  data: BoardCardCopyInputType
): Promise<BoardCardCopyReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const { boardId, cardId } = data;
  let card;

  try {
    const cardToCopy = await prismadb.boardCard.findUnique({
      where: {
        id: cardId,
        boardList: {
          board: {
            id: boardId,
          },
        },
      },
    });

    if (!cardToCopy)
      return {
        error: "Failed to copy.",
      };
    const lastCard = await prismadb.boardCard.findFirst({
      where: { boardListId: cardToCopy.boardListId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await prismadb.boardCard.create({
      data: {
        title: `${cardToCopy.title} - Copy`,
        description: cardToCopy.description,
        order: newOrder,
        boardListId: cardToCopy.boardListId,
      },
    });
  } catch (error) {
    return {
      error: "Failed to copy.",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: card,
  };
};

export const BoardCardCopyAction = createSafeAction(
  BoardCardCopySchema,
  handler
);
