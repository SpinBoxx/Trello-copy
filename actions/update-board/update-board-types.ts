import { z } from "zod";
import { BoardUpdateSchema } from "./update-board-schema";
import { ActionState } from "@/lib/create-safe-action";
import { Board } from "@prisma/client";

export type BoardUpdateInputType = z.infer<typeof BoardUpdateSchema>;
export type BoardUpdateReturnType = ActionState<BoardUpdateInputType, Board>;
