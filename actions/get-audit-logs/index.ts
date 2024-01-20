"use server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prisma";
import { AuditLog, BoardCard } from "@prisma/client";

type ReturnType = {
  auditLogs?: AuditLog[];

  error?: string;
};

const handler = async (cardId?: string): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  try {
    const auditLogs = await prismadb.auditLog.findMany({
      where: {
        orgId,
        entityId: cardId,
        entityType: "CARD",
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    return {
      auditLogs,
    };
  } catch (error) {
    return {
      error: "Failed to get audit logs.",
    };
  }
};

export const GetAuditLogs = handler;
