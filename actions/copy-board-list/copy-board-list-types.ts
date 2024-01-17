import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { BoardList } from "@prisma/client";
import { BoardListCopySchema } from "./copy-board-list-schema";

export type BoardListCopyInputType = z.infer<typeof BoardListCopySchema>;
export type BoardListCopyReturnType = ActionState<
  BoardListCopyInputType,
  BoardList
>;
