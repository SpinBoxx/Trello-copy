import { z } from "zod";

export const BoardListOrderUpdateSchema = z.object({
  boardId: z.string(),
  lists: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
});
