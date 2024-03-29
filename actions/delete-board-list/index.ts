"use server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import {
  BoardListDeleteInputType,
  BoardListDeleteReturnType,
} from "./delete-board-list-types";
import { BoardListDeleteSchema } from "./delete-board-list-schema";
import { createAuditLog } from "@/services/audit-log/create-audit-log";

const handler = async (
  data: BoardListDeleteInputType
): Promise<BoardListDeleteReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const { boardId, boardListId } = data;
  let list;

  try {
    list = await prismadb.boardList.delete({
      where: {
        id: boardListId,
        boardId,
        board: {
          orgId,
        },
      },
    });

    await createAuditLog({
      action: "DELETE",
      entityId: list.id,
      entityTitle: list.title,
      entityType: "LIST",
    });
  } catch (error) {
    return {
      error: "Failed to delete.",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: list,
  };
};

export const BoardListDeleteAction = createSafeAction(
  BoardListDeleteSchema,
  handler
);
