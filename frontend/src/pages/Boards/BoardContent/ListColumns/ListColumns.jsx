import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Column from "./Column/Column";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewColumn } from "~/redux/actions/boardAction";

function ListColumns({ columns, createNewCard, deleteColumnDetails }) {
  const { auth, boards } = useSelector((state) => state);
  const dispatch = useDispatch();
  let userToken = auth?.userToken;
  let board = boards?.boardDetails;

  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const toggleOpenNewColumnForm = () =>
    setOpenNewColumnForm(!openNewColumnForm);

  const addNewColumn = () => {
    if (!newColumnTitle) {
      toast.error("Please enter Column Title!");
      return;
    }

    const newColumnData = { title: newColumnTitle };

    // createNewColumn(newColumnData);
    dispatch(createNewColumn({ board, newColumnData, userToken }));

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
          <Column
            key={column._id}
            column={column}
            createNewCard={createNewCard}
            deleteColumnDetails={deleteColumnDetails}
          />
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
                color: (theme) => theme.palette.primary.colorTextColumn,
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#101204" : "#f1f2f4",
                width: "100%",
                justifyContent: "flex-start",
                pl: 2.5,
                py: 1,
                "&:hover": {
                  color: (theme) => theme.palette.primary.colorTextColumn,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1b1f13" : "#f1f2f4",
                },
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
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#1e1e1e" : "#f1f2f4",
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
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                "& label": {
                  color: (theme) => theme.palette.primary.colorAddCardColumn,
                },
                "& input": {
                  color: (theme) => theme.palette.primary.colorAddCardColumn,
                },
                "& label.Mui-focused": {
                  color: (theme) => theme.palette.primary.colorAddCardColumn,
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: (theme) =>
                      theme.palette.primary.colorAddCardColumn,
                  },
                  "&:hover fieldset": {
                    borderColor: (theme) =>
                      theme.palette.primary.colorAddCardColumn,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: (theme) =>
                      theme.palette.primary.colorAddCardColumn,
                  },
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
                  color: (theme) => theme.palette.primary.colorTextColumn,
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
