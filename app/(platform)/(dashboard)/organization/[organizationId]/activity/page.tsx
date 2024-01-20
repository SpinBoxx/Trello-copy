import { Separator } from "@/components/ui/separator";
import ActivityList from "./_components/activity-list";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { OrgInfo } from "../_components/info";
import { isSubcriptionValid } from "@/services/subscription";

const ActivityPage = async () => {
  const { orgId } = auth();

  if (!orgId) redirect("/select-org");
  const isPro = await isSubcriptionValid();
  return (
    <div className="w-full">
      <OrgInfo isPro={isPro} />
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
