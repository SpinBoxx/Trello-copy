import { Board } from "@prisma/client";
import BoardTitleForm from "./board-title-form";
import BoardOptions from "./board-options";

interface Props {
  board: Board;
}

const BoardNavbar = ({ board }: Props) => {
  return (
    <div className="fixed top-14 z-40 flex h-14 w-full items-center gap-x-4 bg-black/50 px-6 text-white">
      <BoardTitleForm board={board} />
      <div className="ml-auto">
        <BoardOptions boardId={board.id} />
      </div>
    </div>
  );
};

export default BoardNavbar;
