import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { StripeRedirectSchema } from "./stripe-redirect-schema";

export type StripeRedirectInputType = z.infer<typeof StripeRedirectSchema>;
export type StripeRedirectReturnType = ActionState<
  StripeRedirectInputType,
  { redirectUrl: string }
>;
