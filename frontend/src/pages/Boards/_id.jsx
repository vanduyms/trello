import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar";
import Loading from "~/components/Loading";
import BoardBar from "./BoardBar";
import BoardContent from "./BoardContent/BoardContent";

import { generatePlaceHolderCard } from "../../utils/formatter";
import { toast } from "react-toastify";
import { deleteDataAPI, postDataAPI, putDataAPI } from "~/apis/fetchData";
import { Navigate, useParams } from "react-router-dom";
import { getBoardDetails } from "~/redux/actions/boardAction";

function Board() {
  const { auth, boards } = useSelector((state) => state);
  const board = boards.boardDetails;

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    async function loadData() {
      await dispatch(getBoardDetails(id));
    }
    loadData();
  }, []);

  // const createNewColumn = async (newColumnData) => {
  //   // Call API to create new column
  //   const createdNewColumn = await postDataAPI(
  //     `columns`,
  //     {
  //       ...newColumnData,
  //       boardId: board._id,
  //     },
  //     auth.userToken
  //   ).data;

  //   // When create new column, it doesn't has any card. Therefore, it is necessary to handle the problem of dragging and dropping into an empty column
  //   createdNewColumn.cards = [generatePlaceHolderCard(createdNewColumn)];
  //   createdNewColumn.cardOrderIds = [
  //     generatePlaceHolderCard(createdNewColumn)._id,
  //   ];

  //   const newBoard = { ...board };
  //   newBoard.columns.push(createdNewColumn);
  //   newBoard.columnOrderIds.push(createdNewColumn._id);
  // };

  const createNewCard = async (newCardData) => {
    // Call API to create new card
    const createdNewCard = await postDataAPI(
      `cards`,
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
      `boards/${newBoard._id}`,
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
      `columns/${columnId}`,
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
      `boards/supports/moving_card`,
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
    await deleteDataAPI(`columns/${columnId}`).then((res) =>
      toast.success(res?.deleteResult)
    );
  };

  if (!auth.userToken) {
    return <Navigate replace to="/" />;
  }
  {
    if (!board) {
      return <Loading />;
    }

    return (
      <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        <AppBar />
        <BoardBar board={board} />
        <BoardContent
          board={board}
          createNewCard={createNewCard}
          moveColumns={moveColumns}
          moveCardInTheSameColumn={moveCardInTheSameColumn}
          moveCardToDifferentColumn={moveCardToDifferentColumn}
          deleteColumnDetails={deleteColumnDetails}
        />
      </Container>
    );
  }
}

export default Board;
