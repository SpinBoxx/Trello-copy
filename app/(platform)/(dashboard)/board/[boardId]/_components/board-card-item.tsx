"use client";

import { BoardCard } from "@prisma/client";

interface Props {
  index: number;
  card: BoardCard;
}

const BoardCardItem = ({ card, index }: Props) => {
  return (
    <div
      role="button"
      className="truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm hover:border-black"
    >
      {card.title}
    </div>
  );
};

export default BoardCardItem;
