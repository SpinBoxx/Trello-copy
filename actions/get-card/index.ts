"use server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prisma";
import { BoardCard } from "@prisma/client";
import { wait } from "@/lib/utils";

type ReturnType = {
  card?: BoardCard & {
    boardList: {
      title: string;
    };
  };
  error?: string;
};

const handler = async (cardId?: string): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  try {
    const card = await prismadb.boardCard.findUnique({
      where: {
        id: cardId,
        boardList: {
          board: {
            orgId,
          },
        },
      },
      include: {
        boardList: {
          select: {
            title: true,
          },
        },
      },
    });
    if (!card)
      return {
        error: "Card not found.",
      };
    return {
      card,
    };
  } catch (error) {
    return {
      error: "Failed to get the card.",
    };
  }
};

export const GetCardAction = handler;
