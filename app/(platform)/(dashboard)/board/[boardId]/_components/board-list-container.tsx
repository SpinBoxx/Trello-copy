"use client";

import { BoardListWithBoardCards } from "@/types";

import BoardListForm from "./board-list-form";
import { useEffect, useState } from "react";
import BoardListItem from "./board-list-item";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/use-action";
import { BoardListOrderUpdateAction } from "@/actions/update-board-list-order";
import { toast } from "sonner";
import { BoardCardOrderUpdateAction } from "@/actions/update-board-card-order";
interface Props {
  boardId: string;
  boardList: BoardListWithBoardCards[];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

const BoardListContainer = ({ boardId, boardList }: Props) => {
  const [orderedBoardList, setOrderedBoardList] = useState(boardList);

  useEffect(() => {
    setOrderedBoardList(boardList);
  }, [boardList]);

  const { execute: executeUpdateListsOrder } = useAction(
    BoardListOrderUpdateAction,
    {
      onSuccess: () => toast.success("Lists reordered."),
      onError: (error) => toast.error(error),
    }
  );

  const { execute: executeUpdateCardsOrder } = useAction(
    BoardCardOrderUpdateAction,
    {
      onSuccess: () => toast.success("Cards reordered."),
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;

    // if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // User moves a list
    if (type === "list") {
      const listsReordered = reorder(
        orderedBoardList,
        source.index,
        destination.index
      ).map((item, index) => ({ ...item, order: index }));

      setOrderedBoardList(listsReordered);

      executeUpdateListsOrder({
        boardId,
        lists: listsReordered,
      });
    }

    // User moves a card
    if (type === "card") {
      const sourceList = orderedBoardList.find(
        (list) => list.id === source.droppableId
      );
      const destinationList = orderedBoardList.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destinationList) return;

      // Check if cards exists in the sourceList
      if (!sourceList.boardCards) {
        sourceList.boardCards = [];
      }

      // Check if cards exists in the destinationList
      if (!destinationList.boardCards) {
        destinationList.boardCards = [];
      }

      // Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.boardCards,
          source.index,
          destination.index
        );
        reorderedCards.forEach((card, index) => {
          card.order = index;
        });
        sourceList.boardCards = reorderedCards;

        setOrderedBoardList(orderedBoardList);
        executeUpdateCardsOrder({
          boardId,
          cards: reorderedCards,
        });
      } else {
        // Moving the card in a different list

        // Remove the card from the source list
        const [cardMoved] = sourceList.boardCards.splice(source.index, 1);
        // Assing the new list id to the card moved
        cardMoved.boardListId = destination.droppableId;
        // Decrement the cardMoved index + 1, to replace the hole caused by the card moved
        sourceList.boardCards.forEach((card, index) => {
          card.order = index;
        });

        // Insert the card at destination index
        destinationList.boardCards.splice(destination.index, 0, cardMoved);
        // Increment the cardMoved index + 1, to shift card indexes caused by card insertion
        destinationList.boardCards.forEach((card, index) => {
          card.order = index;
        });

        setOrderedBoardList(orderedBoardList);
        executeUpdateCardsOrder({
          boardId,
          cards: destinationList.boardCards,
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex h-full gap-x-3"
          >
            {orderedBoardList.map((boardList, index) => (
              <BoardListItem
                key={boardList.id}
                index={index}
                boardList={boardList}
              />
            ))}
            {provided.placeholder}
            <BoardListForm boardId={boardId} />
            <div className="w-1 flex-shrink-0" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default BoardListContainer;
