import { MAX_FREE_BOARDS } from "@/constants/boards";
import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export const incrementAvailableBoardsCount = async () => {
  const { orgId } = auth();
  if (!orgId) throw new Error("Unauthorized.");
  const orgLimit = await prismadb.organizationLimit.findUnique({
    where: { orgId },
  });
  if (orgLimit) {
    await prismadb.organizationLimit.update({
      where: { orgId },
      data: { count: { increment: 1 } },
    });
  } else {
    await prismadb.organizationLimit.create({
      data: { orgId, count: 1 },
    });
  }
};

export const decrementAvailableBoardsCount = async () => {
  const { orgId } = auth();
  if (!orgId) throw new Error("Unauthorized.");
  const orgLimit = await prismadb.organizationLimit.findUnique({
    where: { orgId },
  });
  if (orgLimit) {
    await prismadb.organizationLimit.update({
      where: { orgId },
      data: { count: { decrement: orgLimit.count > 0 ? 1 : 0 } },
    });
  } else {
    await prismadb.organizationLimit.create({
      data: { orgId, count: 1 },
    });
  }
};

export const canCreateBoard = async () => {
  const { orgId } = auth();
  if (!orgId) throw new Error("Unauthorized.");

  const orgLimit = await prismadb.organizationLimit.findUnique({
    where: { orgId },
  });

  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
    return true;
  }
  return false;
};

export const getAvailableBoardsToCreate = async () => {
  const { orgId } = auth();
  if (!orgId) return 0;

  const orgLimit = await prismadb.organizationLimit.findUnique({
    where: { orgId },
  });

  if (!orgLimit || orgLimit.count > MAX_FREE_BOARDS) {
    return 0;
  }

  return orgLimit.count;
};
