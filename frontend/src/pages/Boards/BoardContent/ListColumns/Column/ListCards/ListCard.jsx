import Box from "@mui/material/Box";
import TrelloCard from "./TrelloCard/TrelloCard";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function ListCard({ auth, board, cards, socket }) {
  return (
    <SortableContext
      items={cards?.map((c) => c._id)}
      strategy={verticalListSortingStrategy}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          p: "0 5px",
          m: "0 5px",
          overflowX: "hidden",
          overflowY: "auto",
          maxHeight: (theme) =>
            `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(
              5
            )} - ${theme.trelloCustom.columnHeaderHeight} - ${
              theme.trelloCustom.columnFooterHeight
            })`,
          "&::-webkit-scrollbar-thumb": (theme) => ({
            backgroundColor: theme.palette.primary.scrollBarColumnBg,
          }),
          "&::-webkit-scrollbar-thumb:hover": (theme) => ({
            backgroundColor: theme.palette.primary.scrollBarColumnBg_Hovered,
          }),
        }}
      >
        {cards.map((card) => (
          <TrelloCard
            key={card._id}
            auth={auth}
            board={board}
            card={card}
            socket={socket}
          />
        ))}
      </Box>
    </SortableContext>
  );
}

export default ListCard;
