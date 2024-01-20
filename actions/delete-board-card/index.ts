"use server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import {
  BoardCardDeleteInputType,
  BoardCardDeleteReturnType,
} from "./delete-board-card-types";
import { BoardCardDeleteSchema } from "./delete-board-card-schema";
import { createAuditLog } from "@/services/audit-log/create-audit-log";

const handler = async (
  data: BoardCardDeleteInputType
): Promise<BoardCardDeleteReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const { boardId, cardId } = data;
  let card;

  try {
    card = await prismadb.boardCard.delete({
      where: {
        id: cardId,
        boardList: {
          board: {
            id: boardId,
          },
        },
      },
    });
    await createAuditLog({
      action: "DELETE",
      entityId: card.id,
      entityTitle: card.title,
      entityType: "CARD",
    });
  } catch (error) {
    return {
      error: "Failed to delete.",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: card,
  };
};

export const BoardCardDeleteAction = createSafeAction(
  BoardCardDeleteSchema,
  handler
);
