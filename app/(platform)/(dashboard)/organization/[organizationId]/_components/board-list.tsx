import FormPopover from "@/components/forms/form-popover";
import Hint from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";
import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { HelpCircle, Users2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const BoardList = async () => {
  const { orgId } = auth();
  if (!orgId) return redirect("/select-org");

  const boards = await prismadb.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createAt: "desc",
    },
  });
  return (
    <div className="space-y-4">
      <div className="flex items-center text-lg font-semibold text-neutral-700">
        <Users2 className="mr-2 h-6 w-6" />
        Your boards
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className="group relative aspect-video h-full w-full overflow-hidden rounded-sm bg-sky-700 bg-cover bg-center bg-no-repeat p-2"
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}
        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="hover:opcaity-75 relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1 rounded-sm bg-muted transition"
          >
            <p className="text-sm">Create new board</p>
            <span className="text-sm">5 remaining </span>
            <Hint
              description={`Free workspaces can have up to 5 open boards. For unlimited boards, upgrade this workspace.`}
              sideOffset={1}
              side="top"
            >
              <HelpCircle className="absolute bottom-2 right-2 h-4 w-4" />
            </Hint>
          </div>
        </FormPopover>
      </div>
      Board
    </div>
  );
};

export default BoardList;

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <Skeleton className="aspect-video h-full w-full p-2" />{" "}
      <Skeleton className="aspect-video h-full w-full p-2" />{" "}
      <Skeleton className="aspect-video h-full w-full p-2" />{" "}
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
