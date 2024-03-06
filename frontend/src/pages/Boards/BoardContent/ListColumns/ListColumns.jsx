import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Column from "./Column/Column";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";

import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

function ListColumns({ columns }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const toggleOpenNewColumnForm = () =>
    setOpenNewColumnForm(!openNewColumnForm);

  const addNewColumn = () => {
    if (!newColumnTitle) {
      return;
    }

    toggleOpenNewColumnForm();
    setNewColumnTitle("");
  };

  return (
    <SortableContext
      items={columns?.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          backgroundColor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          color: "primary.colorTextColumn",
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        {columns.map((column) => (
          <Column key={column._id} column={column} />
        ))}
        {!openNewColumnForm ? (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
            }}
            onClick={toggleOpenNewColumnForm}
          >
            <Button
              startIcon={<NoteAddIcon />}
              sx={{
                color: "white",
                width: "100%",
                justifyContent: "flex-start",
                pl: 2.5,
                py: 1,
              }}
            >
              Add another list
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "200px",
              mx: 2,
              p: 1,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <TextField
              label="Enter column title ..."
              type="search"
              size="small"
              variant="outlined"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                "& label": { color: "white" },
                "& input": { color: "white" },
                "& label.Mui-focused": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button
                variant="contained"
                color="success"
                size="small"
                sx={{
                  color: "white",
                  boxShadow: "none",
                  border: "0.5px solid",
                  borderColor: (theme) => theme.palette.success.main,
                  "&:hover": { bgColor: (theme) => theme.palette.success.main },
                }}
                onClick={addNewColumn}
              >
                Add column
              </Button>
              <CloseIcon
                fontSize="small"
                sx={{
                  color: "white",
                  cursor: "pointer",
                  "&:hover": { color: (theme) => theme.palette.warning.main },
                }}
                onClick={toggleOpenNewColumnForm}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  );
}

export default ListColumns;
