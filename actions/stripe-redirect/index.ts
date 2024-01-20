"use server";

import { auth, currentUser } from "@clerk/nextjs";
import prismadb from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { StripeRedirectSchema } from "./stripe-redirect-schema";
import {
  StripeRedirectInputType,
  StripeRedirectReturnType,
} from "./stripe-redirect-types";
import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";

const handler = async (
  data: StripeRedirectInputType
): Promise<StripeRedirectReturnType> => {
  const { userId, orgId } = auth();
  const user = await currentUser();
  if (!userId || !orgId || !user)
    return {
      error: "Unauthorized",
    };
  let url;
  try {
    const settingsUrl = absoluteUrl(`/organization/${orgId}`);
    const organizationSubscription =
      await prismadb.organizationSubscription.findUnique({
        where: { orgId },
      });

    if (organizationSubscription && organizationSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: organizationSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });
      url = stripeSession.url;
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: "EUR",
              product_data: {
                name: "Taskify Pro",
                description: "Unlimited boards for your organization",
              },
              unit_amount: 500,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          orgId,
        },
      });

      url = stripeSession.url || "";
    }
  } catch (error) {
    return {
      error: "Something went wrong with Stripe.",
    };
  }

  revalidatePath(`/organization/${orgId}`);

  return {
    data: {
      redirectUrl: url,
    },
  };
};

export const StripeRedirectAction = createSafeAction(
  StripeRedirectSchema,
  handler
);
