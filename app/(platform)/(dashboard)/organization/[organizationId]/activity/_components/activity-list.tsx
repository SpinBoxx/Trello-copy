import { ActivityItem } from "@/components/modals/card-modal/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import prismadb from "@/lib/prisma";

interface Props {
  props: {
    orgId: string;
  };
}

const ActivityList = async ({ props }: Props) => {
  const { orgId } = props;
  const auditLogs = await prismadb.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <ol className="mt-4 space-y-4">
      <p className="hidden text-center text-xs text-muted-foreground last:block">
        No activity found inside this organization
      </p>
      {auditLogs.map((auditLog) => (
        <ActivityItem auditLog={auditLog} />
      ))}
    </ol>
  );
};

export default ActivityList;

ActivityList.Skeleton = function ActivitySkeleton() {
  return (
    <ol className="mt-4 space-y-4">
      <Skeleton className="h-14 w-4/5" />
      <Skeleton className="h-14 w-1/2" />
      <Skeleton className="h-14 w-[70%]" />
      <Skeleton className="h-14 w-4/5" />
      <Skeleton className="h-14 w-3/4" />
    </ol>
  );
};
