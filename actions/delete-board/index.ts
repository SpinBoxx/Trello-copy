"use server";

import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { BoardDeleteSchema } from "./delete-board-schema";
import {
  BoardDeleteInputType,
  BoardDeleteReturnType,
} from "./delete-board-types";
import { redirect } from "next/navigation";
import { createAuditLog } from "@/services/audit-log/create-audit-log";
import { decrementAvailableBoardsCount } from "@/services/organization-limit";
import { isSubcriptionValid } from "@/services/subscription";

const handler = async (
  data: BoardDeleteInputType
): Promise<BoardDeleteReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const { id } = data;
  let board;

  try {
    board = await prismadb.board.delete({
      where: {
        id,
        orgId,
      },
    });

    await createAuditLog({
      action: "DELETE",
      entityId: board.id,
      entityTitle: board.title,
      entityType: "BOARD",
    });

    const isPro = await isSubcriptionValid();
    if (!isPro) await decrementAvailableBoardsCount();
  } catch (error) {
    return {
      error: "Failed to delete.",
    };
  }

  revalidatePath(`/organization/${orgId}`);

  redirect(`/organization/${orgId}`);
};

export const BoardDeleteAction = createSafeAction(BoardDeleteSchema, handler);
