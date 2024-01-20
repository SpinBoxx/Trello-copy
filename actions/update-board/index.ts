"use server";

import { auth } from "@clerk/nextjs";
import {
  BoardUpdateInputType,
  BoardUpdateReturnType,
} from "./update-board-types";
import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { BoardUpdateSchema } from "./update-board-schema";
import { createAuditLog } from "@/services/audit-log/create-audit-log";

const handler = async (
  data: BoardUpdateInputType
): Promise<BoardUpdateReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const { title, id } = data;
  let board;

  try {
    board = await prismadb.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    });

    await createAuditLog({
      action: "UPDATE",
      entityId: board.id,
      entityTitle: board.title,
      entityType: "BOARD",
    });
  } catch (error) {
    return {
      error: "Failed to update.",
    };
  }

  revalidatePath(`/board/${id}`);

  return {
    data: board,
  };
};

export const BoardUpdateAction = createSafeAction(BoardUpdateSchema, handler);
