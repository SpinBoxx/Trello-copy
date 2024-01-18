import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { Board, BoardCard } from "@prisma/client";
import { BoardCardUpdateSchema } from "./update-board-schema";

export type BoardCardUpdateInputType = z.infer<typeof BoardCardUpdateSchema>;
export type BoardCardUpdateReturnType = ActionState<
  BoardCardUpdateInputType,
  BoardCard
>;
