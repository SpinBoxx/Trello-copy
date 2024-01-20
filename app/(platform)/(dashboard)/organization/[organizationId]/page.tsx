import { auth } from "@clerk/nextjs";
import { OrgInfo } from "./_components/info";
import { Separator } from "@/components/ui/separator";
import BoardList from "./_components/board-list";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { isSubcriptionValid } from "@/services/subscription";

interface Props {
  params: {
    organizationId: string;
  };
}
const OrganizationPage = async ({ params }: Props) => {
  const { userId, orgId } = auth();
  if (!orgId || !userId) redirect("/select-org");
  const isPro = await isSubcriptionValid();
  return (
    <div className="mb-20 w-full">
      <OrgInfo isPro={isPro} />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
};
export default OrganizationPage;
