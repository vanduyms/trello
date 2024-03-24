import * as React from "react";
import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import {
  DndContext,
  // PointerSensor,
  DragOverlay,
  // MouseSensor,
  // TouchSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  // rectIntersection,
  getFirstCollision,
  // closestCenter,
} from "@dnd-kit/core";
import { MouseSensor, TouchSensor } from "~/customLibraries/dndKitSensors";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "./ListColumns/Column/Column";
import TrelloCard from "./ListColumns/Column/ListCards/TrelloCard/TrelloCard";
import { cloneDeep } from "lodash";
import { useRef } from "react";
import { isEmpty } from "lodash";
import { generatePlaceHolderCard } from "~/utils/formatter";
import { moveColumns } from "~/redux/actions/boardAction";
import { useDispatch } from "react-redux";
import {
  moveCardInTheSameColumn,
  moveCardToDifferentColumn,
} from "~/redux/actions/boardAction";

const ACTIVE_DRAG_ITEM = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

function BoardContent({ board }) {
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: {
  //     distance: 10,
  //   },
  // });

  // When mouse moves 10px, activating event
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  // When touch and hole 250ms, activating event
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);
  const lastOverId = useRef(null);

  const [orderedColumns, setOrderedColumns] = React.useState([]);

  // Only moment, there is only one element dragged (column or card)
  const [activeDragItemId, setActiveDragItemId] = React.useState(null);
  const [activeDragItemType, setActiveDragItemType] = React.useState(null);
  const [activeDragItemData, setActiveDragItemData] = React.useState(null);
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    React.useState(null);

  const dispatch = useDispatch();

  React.useEffect(() => {
    setOrderedColumns(board.columns);
  }, [board]);

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column?.cards?.map((card) => card._id)?.includes(cardId)
    );
  };

  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData,
    triggerFrom
  ) => {
    setOrderedColumns((prevColumns) => {
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card._id === overCardId
      );
      let newCardIndex;
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;

      const modifier = isBelowOverItem ? 1 : 0;
      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1;

      const nextColumns = cloneDeep(prevColumns);

      const nextActiveColumns = nextColumns.find(
        (column) => column._id === activeColumn._id
      );
      const nextOverColumns = nextColumns.find(
        (column) => column._id === overColumn._id
      );
      // nextActiveColumns: Old column
      if (nextActiveColumns) {
        // Delete card in column active
        nextActiveColumns.cards = nextActiveColumns.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );

        // Add FE_PlaceholderCard if column is empty
        if (isEmpty(nextActiveColumns.cards)) {
          nextActiveColumns.cards = [
            generatePlaceHolderCard(nextActiveColumns),
          ];
        }

        // Update cardOrderIds array
        nextActiveColumns.cardOrderIds = nextActiveColumns.cards.map(
          (card) => card._id
        );
      }
      if (nextOverColumns) {
        // Check whether card is dragging, which is in  overColumn, if it is here, delete it
        nextOverColumns.cards = nextOverColumns.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );

        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumns._id,
        };

        // Add card is dragging to overColumns follow new index
        nextOverColumns.cards = nextOverColumns.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingCardData
        );

        nextOverColumns.cards = nextOverColumns.cards.filter(
          (card) => !card.FE_PlaceholderCard
        );

        // Update cardOrderIds array
        nextOverColumns.cardOrderIds = nextOverColumns.cards.map(
          (card) => card._id
        );

        const prevColumnId = oldColumnWhenDraggingCard._id;
        const nextColumnId = nextOverColumns._id;
        const currentCardId = activeDragItemId;

        if (triggerFrom === "handleDragEnd") {
          dispatch(
            moveCardToDifferentColumn({
              board,
              currentCardId,
              prevColumnId,
              nextColumnId,
              nextColumns, //dndOrderedColumns
            })
          );
        }
      }
      // console.log(nextColumns);
      return nextColumns;
    });
  };

  const handleDragStart = (e) => {
    setActiveDragItemId(e?.active?.id);
    setActiveDragItemType(
      e?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM.CARD
        : ACTIVE_DRAG_ITEM.COLUMN
    );
    setActiveDragItemData(e?.active?.data?.current);

    if (e?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(e?.active?.id));
    }
  };

  // Trigger when dragging an element
  const handleDragOver = (e) => {
    // Don't work anything if drag column
    if (activeDragItemType === ACTIVE_DRAG_ITEM.COLUMN) return;

    const { active, over } = e;
    if (!active || !over) return;

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    const { id: overCardId } = over;

    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== !overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
        "handleDragOver"
      );
    }
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (!active || !over) return;

    if (activeDragItemType === ACTIVE_DRAG_ITEM.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;
      const { id: overCardId } = over;

      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overColumn = findColumnByCardId(overCardId);

      if (!activeColumn || !overColumn) return;

      // Drag and drop card in two columns
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData,
          "handleDragEnd"
        );
      } else {
        // Drag and drop card in a column

        // Get old index of card from oldColumnWhenDraggingCard
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          (c) => c._id === activeDragItemId
        );

        // Get new index of card from overColumn
        const newCardIndex = overColumn?.cards?.findIndex(
          (c) => c._id === overCardId
        );

        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        );
        const dndOrderedCardIds = dndOrderedCards.map((card) => card._id);

        setOrderedColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);
          const targetColumns = nextColumns.find(
            (c) => c._id === overColumn._id
          );
          targetColumns.cards = dndOrderedCards;
          targetColumns.cardOrderIds = dndOrderedCards.map((card) => card._id);
          return nextColumns;
        });

        let columnId = oldColumnWhenDraggingCard._id;

        dispatch(
          moveCardInTheSameColumn({
            board,
            dndOrderedCards,
            dndOrderedCardIds,
            columnId,
          })
        );
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM.COLUMN) {
      if (active.id !== over.id) {
        const oldColumnIndex = orderedColumns.findIndex(
          (c) => c._id === active.id
        );
        const newColumnIndex = orderedColumns.findIndex(
          (c) => c._id === over.id
        );
        // Set new order column when dragged them
        const dndOrderedColumns = arrayMove(
          orderedColumns,
          oldColumnIndex,
          newColumnIndex
        );

        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id);

        setOrderedColumns(dndOrderedColumns);

        dispatch(moveColumns({ board, dndOrderedColumns }));
      }
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
  };

  const dropAnimationCustom = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: "0.5" } },
    }),
  };

  const collisionDetectionStrategy = React.useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM.COLUMN) {
        return closestCorners({ ...args });
      }

      // Find all point that intersection with pointer
      const pointerIntersections = pointerWithin(args);

      // Fix bug flickering
      if (!pointerIntersections?.length) return;

      // Get array
      // const intersections = !!pointerIntersections?.length
      //   ? pointerIntersections
      //   : rectIntersection(args);

      let overId = getFirstCollision(pointerIntersections, "id");
      if (overId) {
        // Nếu cái over nó là column thì sẽ tìm tới cái cardId gần nhất bên trong khu vực va chạm đó dựa vào thuật toán phát hiện va chạm closestCenter hoặc closestCorner đều được. Ở đây ta sử dụng closestCorner vì mượt hơn
        const checkColumn = orderedColumns.find((c) => c._id === overId);
        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) => {
                return (
                  container.id !== overId &&
                  checkColumn?.cardOrderIds?.includes(container.id)
                );
              }
            ),
          })[0]?.id;
        }

        lastOverId.current = overId;
        return [{ id: overId }];
      }
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeDragItemType, orderedColumns]
  );

  return (
    <DndContext
      sensors={sensors}
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          width: "100%",
          height: (theme) => theme.trelloCustom.boardContentHeight,
          backgroundColor: "primary.main",
          p: "10px 0",
        }}
      >
        <ListColumns board={board} columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimationCustom}>
          {!activeDragItemType && null}
          {activeDragItemType == ACTIVE_DRAG_ITEM.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType == ACTIVE_DRAG_ITEM.CARD && (
            <TrelloCard card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  );
}

export default BoardContent;
