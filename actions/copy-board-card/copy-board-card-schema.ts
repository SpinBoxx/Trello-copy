import { z } from "zod";

export const BoardCardCopySchema = z.object({
  boardId: z.string(),
  cardId: z.string(),
});
