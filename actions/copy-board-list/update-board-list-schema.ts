import { z } from "zod";

export const BoardListCopySchema = z.object({
  boardId: z.string(),
  boardListId: z.string(),
});
