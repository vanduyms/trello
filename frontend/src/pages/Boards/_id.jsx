import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar";
import Loading from "~/components/Loading";
import BoardBar from "./BoardBar";
import BoardContent from "./BoardContent/BoardContent";

import { Navigate, useParams } from "react-router-dom";
import { getBoardDetails } from "~/redux/actions/boardAction";
import { addToRecentlyViewed } from "~/redux/reducers/boardReducer";

function Board() {
  const { auth, boards } = useSelector((state) => state);
  const board = boards.boardDetails;

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    async function loadData() {
      await dispatch(getBoardDetails(id));
      dispatch(addToRecentlyViewed());
    }
    loadData();
  }, [id]);

  if (!auth.userToken) {
    return <Navigate replace to="/" />;
  } else {
    if (!board) {
      return <Loading />;
    }

    return (
      <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        <AppBar auth={auth} boards={boards} />
        <BoardBar boards={boards} />
        <BoardContent auth={auth} board={board} />
      </Container>
    );
  }
}

export default Board;
