import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { BoardCard } from "@prisma/client";
import { BoardCardOrderUpdateSchema } from "./update-board-card-order-schema";

export type BoardCardOrderUpdateInputType = z.infer<
  typeof BoardCardOrderUpdateSchema
>;
export type BoardCardOrderUpdateReturnType = ActionState<
  BoardCardOrderUpdateInputType,
  BoardCard[]
>;
