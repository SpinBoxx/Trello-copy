"use client";

import { Draggable } from "@hello-pangea/dnd";
import { BoardCard } from "@prisma/client";

interface Props {
  index: number;
  card: BoardCard;
}

const BoardCardItem = ({ card, index }: Props) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          role="button"
          className="truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm hover:border-black"
        >
          {card.title}
        </div>
      )}
    </Draggable>
  );
};

export default BoardCardItem;
