import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import BoardListContainer from "./_components/board-list-container";

interface Props {
  params: {
    boardId: string;
  };
}

const BoardPage = async ({ params }: Props) => {
  const { orgId } = auth();

  if (!orgId) redirect("/select-org");

  const boardLists = await prismadb.boardList.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    include: {
      boardCards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="h-full overflow-x-auto p-4">
      <BoardListContainer boardId={params.boardId} boardList={boardLists} />
    </div>
  );
};

export default BoardPage;
