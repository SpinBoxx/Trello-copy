import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { startCase } from "lodash";
import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";
import BoardNavbar from "./_components/board-navbar";

interface Props {
  children: ReactNode;
  params: {
    boardId: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const { orgId } = auth();
  if (!orgId)
    return {
      title: "Board",
    };
  const board = await prismadb.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });
  if (!board)
    return {
      title: "Board",
    };
  return {
    title: startCase(board.title) || "Board",
  };
}

const BoardLayout = async ({ children, params }: Props) => {
  const { orgId } = auth();
  if (!orgId) redirect("/select-org");

  const board = await prismadb.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  if (!board) notFound();

  return (
    <div
      className="relative h-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${board.imageFullUrl})`,
      }}
    >
      <BoardNavbar board={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative h-full pt-28">{children}</main>
    </div>
  );
};

export default BoardLayout;
