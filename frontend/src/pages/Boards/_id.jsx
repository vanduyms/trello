import Container from "@mui/material/Container";

import AppBar from "~/components/AppBar";
import BoardBar from "./BoardBar";
import BoardContent from "./BoardContent/BoardContent";

import { mockData } from "~/apis/mock-data";
import { useEffect, useState } from "react";
import { fetchBoardDetailsAPI } from "~/apis/index";

function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "65e47dac836a939620b4c3fc";

    fetchBoardDetailsAPI(boardId).then((res) => {
      console.log("Board: ", res);
    });
  }, []);
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={mockData?.board} />
      <BoardContent board={mockData?.board} />
    </Container>
  );
}

export default Board;
