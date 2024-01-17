import { z } from "zod";

export const BoardListDeleteSchema = z.object({
  boardId: z.string(),
  boardListId: z.string(),
});
