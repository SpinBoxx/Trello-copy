import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { BoardCard } from "@prisma/client";
import { BoardCardDeleteSchema } from "./delete-board-card-schema";

export type BoardCardDeleteInputType = z.infer<typeof BoardCardDeleteSchema>;
export type BoardCardDeleteReturnType = ActionState<
  BoardCardDeleteInputType,
  BoardCard
>;
