"use server";

import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { BoardCardCreateSchema } from "./create-board-card-schema";
import {
  BoardCardCreateInputType,
  BoardCardCreateReturnType,
} from "./create-board-card-types";
import { createAuditLog } from "@/services/audit-log/create-audit-log";
import { ENTITY_TYPE } from "@prisma/client";

const handler = async (
  data: BoardCardCreateInputType
): Promise<BoardCardCreateReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const { title, boardId, boardListId } = data;

  try {
    const list = await prismadb.boardList.findUnique({
      where: {
        id: boardListId,
        board: {
          orgId,
        },
      },
    });
    if (!list)
      return {
        error: "List not found.",
      };

    const lastCard = await prismadb.boardCard.findFirst({
      where: { boardListId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;
    const card = await prismadb.boardCard.create({
      data: {
        title,
        boardListId,
        order: newOrder,
      },
    });
    await createAuditLog({
      action: "CREATE",
      entityId: card.id,
      entityTitle: card.title,
      entityType: "CARD",
    });
    revalidatePath(`/board/${boardId}`);
    return { data: card };
  } catch (error) {
    return {
      error: "Failed to create the list.",
    };
  }
};

export const BoardCardCreateAction = createSafeAction(
  BoardCardCreateSchema,
  handler
);
