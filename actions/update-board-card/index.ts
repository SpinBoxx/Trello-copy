"use server";

import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import {
  BoardCardUpdateInputType,
  BoardCardUpdateReturnType,
} from "./update-board-types";
import { BoardCardUpdateSchema } from "./update-board-schema";
import { createAuditLog } from "@/services/audit-log/create-audit-log";

const handler = async (
  data: BoardCardUpdateInputType
): Promise<BoardCardUpdateReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const { cardId, boardId, ...values } = data;
  let card;

  try {
    card = await prismadb.boardCard.update({
      where: {
        id: cardId,
        boardList: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...values,
      },
    });

    await createAuditLog({
      action: "UPDATE",
      entityId: card.id,
      entityTitle: card.title,
      entityType: "CARD",
    });
  } catch (error) {
    return {
      error: "Failed to update.",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: card,
  };
};

export const BoardCardUpdateAction = createSafeAction(
  BoardCardUpdateSchema,
  handler
);
