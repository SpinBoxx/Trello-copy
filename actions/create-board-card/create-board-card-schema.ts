import { z } from "zod";

export const BoardCardCreateSchema = z.object({
  title: z
    .string({
      required_error: "Title is required.",
      invalid_type_error: "Title is required.",
    })
    .min(3, "Title is too short."),
  boardId: z.string(),
  boardListId: z.string(),
});
