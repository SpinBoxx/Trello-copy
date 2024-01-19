import { z } from "zod";

export const BoardCardUpdateSchema = z.object({
  title: z.optional(
    z
      .string({
        required_error: "Title is required.",
        invalid_type_error: "Title is required.",
      })
      .min(3, "Title is too short.")
  ),
  description: z.optional(
    z
      .string({
        required_error: "Description is required.",
        invalid_type_error: "Description is required.",
      })
      .min(3, "Description is too short.")
  ),

  boardId: z.string(),
  cardId: z.string(),
});
