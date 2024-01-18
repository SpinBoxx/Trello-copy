"use server";

import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prisma";

import { BoardCard } from "@prisma/client";
import { wait } from "@/lib/utils";
import { unstable_noStore } from "next/cache";

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
  // throw new Error("test");
  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  try {
    console.log("wait");
    // unstable_noStore();
    // await wait(5000);
    console.log("OK");
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
