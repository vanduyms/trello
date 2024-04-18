import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NotesIcon from "@mui/icons-material/Notes";
import { updateCard } from "~/redux/actions/cardAction";
import { useDispatch } from "react-redux";

function CardDescription({ board, card }) {
  const [changeDescription, setChangeDescription] = useState(false);
  const [description, setDescription] = useState(card?.description);

  const dispatch = useDispatch();

  const handleUpdateCard = () => {
    const id = card._id;
    const data = {
      boardId: card.boardId,
      columnId: card.columnId,
      title: card.title,
      description: description,
    };
    dispatch(updateCard({ board, id, data }));
    setChangeDescription(false);
  };

  return (
    <Box sx={{ mb: "24px" }}>
      <Box sx={{ display: "flex", paddingY: 1, alignItems: "center" }}>
        <NotesIcon sx={{ margin: "4px", marginRight: "12px" }} />
        <Typography>Description</Typography>
      </Box>
      <TextField
        multiline
        rows={2}
        placeholder="Add a more detailed description..."
        sx={{ width: "100%", pl: 5 }}
        onClick={() => setChangeDescription(true)}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button
        sx={{
          ml: 5,
          mt: 1,
          backgroundColor: "primary.createBtnBg",
          "&:hover": {
            backgroundColor: "primary.createBtnBg_Hovered",
          },
          display: !!changeDescription ? "block" : "none",
        }}
        variant="contained"
        onClick={handleUpdateCard}
      >
        Save
      </Button>
    </Box>
  );
}

export default CardDescription;
