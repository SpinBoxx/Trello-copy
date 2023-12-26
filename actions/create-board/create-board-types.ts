import { z } from "zod";
import { BoardCreateSchema } from "./create-board-schema";
import { ActionState } from "@/lib/create-safe-action";
import { Board } from "@prisma/client";

export type BoardInputType = z.infer<typeof BoardCreateSchema>;
export type BoardReturnType = ActionState<BoardInputType, Board>;
