import { z } from "zod";

export const BoardCardDeleteSchema = z.object({
  boardId: z.string(),
  cardId: z.string(),
});
