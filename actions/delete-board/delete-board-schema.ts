import { z } from "zod";

export const BoardDeleteSchema = z.object({
  id: z.string(),
});
