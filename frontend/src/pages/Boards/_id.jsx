import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar";
import BoardBar from "./BoardBar";
import BoardContent from "./BoardContent/BoardContent";

import { generatePlaceHolderCard } from "../../utils/formatter";
import { isEmpty } from "lodash";
import { mapOrder } from "~/utils/sort";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import {
  deleteDataAPI,
  getDataAPI,
  postDataAPI,
  putDataAPI,
} from "~/apis/fetchData";

function Board() {
  const { auth } = useSelector((state) => state);
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "65e5cbf10dc8744a7fff3ece";
    // Call API to get board details
    getDataAPI(`/boards/${boardId}`, auth.userToken).then((res) => {
      console.log(res);
      let board = res.data;
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
    // Call API to create new column
    const createdNewColumn = await postDataAPI(
      `/columns`,
      {
        ...newColumnData,
        boardId: board._id,
      },
      auth.userToken
    ).data;

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
    // Call API to create new card
    const createdNewCard = await postDataAPI(
      `/cards`,
      {
        ...newCardData,
        boardId: board._id,
      },
      auth.userToken
    ).data;

    const newBoard = { ...board };

    const columnToUpdated = newBoard.columns.find(
      (column) => column._id === createdNewCard.columnId
    );

    if (columnToUpdated.cards.some((card) => card.FE_PlaceholderCard)) {
      columnToUpdated.cards = [createdNewCard];
      columnToUpdated.cardOrderIds = [createdNewCard._id];
    } else {
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

    await putDataAPI(
      `/boards/${newBoard._id}`,
      {
        columnOrderIds: dndOrderedColumnsIds,
      },
      auth.userToken
    );
  };

  const moveCardInTheSameColumn = async (
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

    // Call API to update column details
    await putDataAPI(
      `/columns/${columnId}`,
      { cardOrderIds: dndOrderedCardIds },
      auth.userToken
    );
  };

  const moveCardToDifferentColumn = async (
    currentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumns
  ) => {
    const dndOrderedColumnIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnIds;
    setBoard(newBoard);

    // Call API from BE
    let prevCardOrderIds = dndOrderedColumns.find(
      (c) => c._id === prevColumnId
    )?.cardOrderIds;
    // Solve the problem when pulling the last card from the column, the empty column will have a placeholder card, need to delete it before sending data to BE
    if (prevCardOrderIds[0].includes("placeholder-card")) prevCardOrderIds = [];

    // Call API to move card ro different column
    await putDataAPI(
      `/boards/supports/moving_card`,
      {
        currentCardId,
        prevColumnId,
        prevCardOrderIds,
        nextColumnId,
        nextCardOrderIds: dndOrderedColumns.find((c) => c._id === nextColumnId)
          ?.cardOrderIds,
      },
      auth.userToken
    );
  };

  const deleteColumnDetails = async (columnId) => {
    const newBoard = { ...board };
    newBoard.columns = newBoard.columns.filter((c) => c._id !== columnId);
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
      (_id) => _id !== columnId
    );
    setBoard(newBoard);

    // Call API to create delete a column
    await deleteDataAPI(`/columns/${columnId}`, auth.userToken).then((res) =>
      toast.success(res?.deleteResult)
    );
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
        moveCardToDifferentColumn={moveCardToDifferentColumn}
        deleteColumnDetails={deleteColumnDetails}
      />
    </Container>
  );
}

export default Board;
