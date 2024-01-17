import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { Board, BoardList } from "@prisma/client";
import { BoardListCreateSchema } from "./create-board-list-schema";

export type BoardListCreateInputType = z.infer<typeof BoardListCreateSchema>;
export type BoardListCreateReturnType = ActionState<
  BoardListCreateInputType,
  BoardList
>;
