import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { BoardList } from "@prisma/client";
import { BoardListDeleteSchema } from "./delete-board-list-schema";

export type BoardListDeleteInputType = z.infer<typeof BoardListDeleteSchema>;
export type BoardListDeleteReturnType = ActionState<
  BoardListDeleteInputType,
  BoardList
>;
