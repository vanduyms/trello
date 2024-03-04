import Container from "@mui/material/Container";

import AppBar from "~/components/AppBar";
import BoardBar from "./BoardBar";
import BoardContent from "./BoardContent/BoardContent";

import { useEffect, useState } from "react";
import { fetchBoardDetailsAPI } from "~/apis/index";

function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "65e5cbf10dc8744a7fff3ece";

    fetchBoardDetailsAPI(boardId).then((res) => setBoard(res));
  }, []);
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  );
}

export default Board;
