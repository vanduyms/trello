import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar";
import Loading from "~/components/Loading";
import BoardBar from "./BoardBar";
import BoardContent from "./BoardContent/BoardContent";

import { useParams } from "react-router-dom";
import { getBoardDetails } from "~/redux/actions/boardAction";
import { addToRecentlyViewed } from "~/redux/reducers/boardReducer";

function Board({ auth, boards, socket }) {
  const board = boards.boardDetails;

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    async function loadData() {
      await dispatch(getBoardDetails(id));
      dispatch(addToRecentlyViewed());
    }
    loadData();
  }, [dispatch, id]);

  if (!board) {
    return <Loading />;
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar auth={auth} boards={boards} />
      <BoardBar boards={boards} socket={socket} />
      <BoardContent auth={auth} board={board} socket={socket} />
    </Container>
  );
}

export default Board;
