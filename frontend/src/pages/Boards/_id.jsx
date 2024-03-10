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
} from "~/apis";

function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "65e5cbf10dc8744a7fff3ece";

    fetchBoardDetailsAPI(boardId).then((board) => {
      // When reload website, it is necessary to fix when dragging and dropping a item to an empty column
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceHolderCard(column)];
          column.cardOrderIds = [generatePlaceHolderCard(column)._id];
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
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
      />
    </Container>
  );
}

export default Board;
