import Container from "@mui/material/Container";

import AppBar from "~/components/AppBar";
import BoardBar from "./BoardBar";
import BoardContent from "./BoardContent/BoardContent";

import { useEffect, useState } from "react";
import { generatePlaceHolderCard } from "../../utils/formatter";
import { isEmpty } from "lodash";
import {
  fetchBoardDetailsAPI,
  createNewColumnAPI,
  createNewCardAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
} from "~/apis";
import { mapOrder } from "~/utils/sort";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "65e5cbf10dc8744a7fff3ece";

    fetchBoardDetailsAPI(boardId).then((board) => {
      board.columns = mapOrder(board.columns, board.columnOrderIds, "_id");

      // When reload website, it is necessary to fix when dragging and dropping a item to an empty column
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceHolderCard(column)];
          column.cardOrderIds = [generatePlaceHolderCard(column)._id];
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, "_id");
        }
      });
      setBoard(board);
    });
  }, []);

  const createNewColumn = async (newColumnData) => {
    const createdNewColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id,
    });

    // When create new column, it doesn't has any card. Therefore, it is necessary to handle the problem of dragging and dropping into an empty column
    createdNewColumn.cards = [generatePlaceHolderCard(createdNewColumn)];
    createdNewColumn.cardOrderIds = [
      generatePlaceHolderCard(createdNewColumn)._id,
    ];

    const newBoard = { ...board };
    newBoard.columns.push(createdNewColumn);
    newBoard.columnOrderIds.push(createdNewColumn._id);

    setBoard(newBoard);
  };

  const createNewCard = async (newCardData) => {
    const createdNewCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id,
    });

    const newBoard = { ...board };

    const columnToUpdated = newBoard.columns.find(
      (column) => column._id === createdNewCard.columnId
    );
    if (columnToUpdated) {
      columnToUpdated.cards.push(createdNewCard);
      columnToUpdated.cardOrderIds.push(createdNewCard._id);
    }

    setBoard(newBoard);
  };

  const moveColumns = async (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    await updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnsIds,
    });
  };

  const moveCardInTheSameColumn = (
    dndOrderedCards,
    dndOrderedCardIds,
    columnId
  ) => {
    const newBoard = { ...board };
    const columnToUpdated = newBoard.columns.find(
      (column) => column._id === columnId
    );
    if (columnToUpdated) {
      columnToUpdated.cards = dndOrderedCards;
      columnToUpdated.cardOrderIds = dndOrderedCardIds;
    }

    setBoard(newBoard);

    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds });
  };

  if (!board) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          width: "100vw",
          height: "100vh",
        }}
      >
        <CircularProgress color="secondary" />
        <Typography>Loading ...</Typography>
      </Box>
    );
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
      />
    </Container>
  );
}

export default Board;
