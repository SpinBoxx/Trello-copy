"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";
import { ActivityItem } from "./activity-item";

interface Props {
  activity: AuditLog[];
}

export const Activity = ({ activity }: Props) => {
  return (
    <div className="flex w-full items-start gap-x-3">
      <ActivityIcon className="mt-0.5 h-5 w-5 text-neutral-700" />
      <div className="w-full">
        <p className="mb-2 font-semibold text-neutral-700">Activity</p>
        <ol className="mt-2 space-y-4">
          {activity.map((auditLog) => (
            <ActivityItem key={auditLog.id} auditLog={auditLog} />
          ))}
        </ol>
      </div>
    </div>
  );
};

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex w-full items-start gap-x-3">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full space-y-2">
        <Skeleton className="h-6 w-24 bg-neutral-200" />
        <Skeleton className="h-20 w-full bg-neutral-200" />
      </div>
    </div>
  );
};
