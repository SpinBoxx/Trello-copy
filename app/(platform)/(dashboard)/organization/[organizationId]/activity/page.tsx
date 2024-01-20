import { Separator } from "@/components/ui/separator";
import ActivityList from "./_components/activity-list";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { OrgInfo } from "../_components/info";

const ActivityPage = async () => {
  const { orgId } = auth();

  if (!orgId) redirect("/select-org");
  return (
    <div className="w-full">
      <OrgInfo />
      <Separator className="my-2" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList
          props={{
            orgId,
          }}
        />
      </Suspense>
    </div>
  );
};

export default ActivityPage;
