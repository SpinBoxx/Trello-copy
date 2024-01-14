import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { Board } from "@prisma/client";
import { BoardDeleteSchema } from "./delete-board-schema";

export type BoardDeleteInputType = z.infer<typeof BoardDeleteSchema>;
export type BoardDeleteReturnType = ActionState<BoardDeleteInputType, Board>;
