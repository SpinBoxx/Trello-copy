import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

const DAY_IN_MS = 86_400_000;

export const isSubcriptionValid = async () => {
  const { orgId } = auth();
  if (!orgId) return false;

  const orgSubcription = await prismadb.organizationSubscription.findUnique({
    where: {
      orgId,
    },
  });

  if (!orgSubcription) return false;

  const isValid =
    orgSubcription.stripePriceId &&
    orgSubcription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValid;
};
