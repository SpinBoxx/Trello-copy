import { auth } from "@clerk/nextjs";
import { Info } from "./_components/info";
import { Separator } from "@/components/ui/separator";
import BoardList from "./_components/board-list";

interface Props {
  params: {
    organizationId: string;
  };
}

const OrganizationPage = ({ params }: Props) => {
  const { userId, orgId } = auth();
  return (
    <div className="mb-20 w-full">
      <Info />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <BoardList />
      </div>
    </div>
  );
};

export default OrganizationPage;
