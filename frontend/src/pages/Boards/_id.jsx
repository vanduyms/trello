import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar";
import Loading from "~/components/Loading";
import BoardBar from "./BoardBar";
import BoardContent from "./BoardContent/BoardContent";

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
        <BoardContent board={board} />
      </Container>
    );
  }
}

export default Board;
