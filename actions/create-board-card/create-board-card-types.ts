import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { BoardCard } from "@prisma/client";
import { BoardCardCreateSchema } from "./create-board-card-schema";

export type BoardCardCreateInputType = z.infer<typeof BoardCardCreateSchema>;
export type BoardCardCreateReturnType = ActionState<
  BoardCardCreateInputType,
  BoardCard
>;
