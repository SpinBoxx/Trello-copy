import prismadb from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export const createAuditLog = async ({
  action,
  entityId,
  entityTitle,
  entityType,
}: Props) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();
    if (!user || !orgId) throw new Error("User not found.");

    await prismadb.auditLog.create({
      data: {
        orgId,
        entityId,
        entityType,
        entityTitle,
        action,
        userId: user.id,
        userImage: user.imageUrl,
        username: user.firstName + " " + user.lastName,
      },
    });
  } catch (error) {
    console.log("[AUDIT_LOG_ERROR]", error);
  }
};
