import { z } from "zod";

export const BoardCardOrderUpdateSchema = z.object({
  boardId: z.string(),
  cards: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      boardListId: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
});
