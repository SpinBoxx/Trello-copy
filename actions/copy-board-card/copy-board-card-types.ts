import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { BoardCard } from "@prisma/client";
import { BoardCardCopySchema } from "./copy-board-card-schema";

export type BoardCardCopyInputType = z.infer<typeof BoardCardCopySchema>;
export type BoardCardCopyReturnType = ActionState<
  BoardCardCopyInputType,
  BoardCard
>;
