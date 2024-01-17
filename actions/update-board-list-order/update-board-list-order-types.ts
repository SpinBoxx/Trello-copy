import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { BoardList } from "@prisma/client";
import { BoardListOrderUpdateSchema } from "./update-board-list-order-schema";

export type BoardListOrderUpdateInputType = z.infer<
  typeof BoardListOrderUpdateSchema
>;
export type BoardListOrderUpdateReturnType = ActionState<
  BoardListOrderUpdateInputType,
  BoardList[]
>;
