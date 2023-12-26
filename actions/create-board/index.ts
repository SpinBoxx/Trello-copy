"use server";

import { auth } from "@clerk/nextjs";
import { BoardInputType, BoardReturnType } from "./create-board-types";
import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { BoardCreateSchema } from "./create-board-schema";

const handler = async (data: BoardInputType): Promise<BoardReturnType> => {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Unauthorized !",
    };
  }
  const { title } = data;
  let board;

  try {
    board = await prismadb.board.create({
      data: {
        title,
      },
    });
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
