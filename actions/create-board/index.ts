"use server";

import { auth } from "@clerk/nextjs";
import { BoardInputType, BoardReturnType } from "./create-board-types";
import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { BoardCreateSchema } from "./create-board-schema";
import { createAuditLog } from "@/services/audit-log/create-audit-log";
import {
  canCreateBoard,
  incrementAvailableBoardsCount,
} from "@/services/organization-limit";
import { isSubcriptionValid } from "@/services/subscription";

const handler = async (data: BoardInputType): Promise<BoardReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized !",
    };
  }
  const canCreate = await canCreateBoard();
  const isPro = isSubcriptionValid();

  if (!canCreate && !isPro) {
    return {
      error:
        "You have reached your limit of free boards. Please upgrade to create more.",
    };
  }

  const { title, image } = data;
  let board;
  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUsername] =
    image.split("|");

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageUsername
  ) {
    return {
      error: "Missing fields. Failed to create a board.",
    };
  }
  try {
    board = await prismadb.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageFullUrl,
        imageLinkHTML,
        imageThumbUrl,
        imageUsername,
      },
    });

    await createAuditLog({
      action: "CREATE",
      entityId: board.id,
      entityTitle: board.title,
      entityType: "BOARD",
    });

    if (!isPro) await incrementAvailableBoardsCount();
  } catch (error) {
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath(`/board/${board.id}`);
  return {
    data: board,
  };
};

export const createBoard = createSafeAction(BoardCreateSchema, handler);
