import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { BoardList } from "@prisma/client";
import { BoardListUpdateSchema } from "./update-board-list-schema";

export type BoardListUpdateInputType = z.infer<typeof BoardListUpdateSchema>;
export type BoardListUpdateReturnType = ActionState<
  BoardListUpdateInputType,
  BoardList
>;
