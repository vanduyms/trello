import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import ListCard from "./ListCards/ListCard";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import AddCardIcon from "@mui/icons-material/AddCard";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArchiveIcon from "@mui/icons-material/Archive";
import { useConfirm } from "material-ui-confirm";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteColumnDetails,
  createNewCard,
} from "~/redux/actions/boardAction";

function Column({ auth, board, column }) {
  const orderedCards = column.cards;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column._id, data: { ...column } });

  const dndKitColumnStyles = {
    // touchAction: "none",
    transform: CSS.Translate.toString(transform),
    transition,
    height: "100%",
    opacity: isDragging ? 0.5 : undefined,
  };

  const [openNewCardForm, setOpenNewCardForm] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");

  const dispatch = useDispatch();
  const columnId = column._id;

  const toggleOpenNewCardForm = () => {
    setOpenNewCardForm(!openNewCardForm);
  };

  const addNewCard = async () => {
    if (!newCardTitle) {
      toast.error("Please enter Card Title!", {
        position: "top-right",
      });
      return;
    }

    const newCardData = {
      title: newCardTitle,
      columnId: column._id,
    };

    await dispatch(createNewCard({ board, newCardData }));

    toggleOpenNewCardForm();
    setNewCardTitle("");
  };

  const confirmDeleteColumn = useConfirm();
  const handleDeleteColumn = () => {
    confirmDeleteColumn({
      title: "Delete column",
      description:
        "This action will permanently delete your Column and its Cards! Are you sure ?",
      confirmationText: "Confirm",
      cancellationText: "Cancel",
    })
      .then(() => dispatch(deleteColumnDetails({ board, columnId })))
      .catch();
  };

  return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: "300px",
          maxWidth: "300px",
          height: "fit-content",
          maxHeight: (theme) =>
            `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(
              5
            )})`,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101204" : "#f1f2f4",
          ml: 2,
          borderRadius: "6px",
          color: "primary.colorTextColumn",
        }}
      >
        <Box
          sx={{
            height: (theme) => theme.trelloCustom.columnHeaderHeight,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", cursor: "pointer" }}
          >
            {column?.title}
          </Typography>

          <Box>
            <Button
              sx={{
                padding: "0px 4px",
                minWidth: "max-content !important",
                color: "primary.colorTextColumn",
                "& .MuiButton-endIcon": {
                  mr: 0,
                  ml: 0,
                  padding: "0px 4px",
                },
              }}
              id="basic-button-recent"
              aria-controls={open ? "basic-menu-recent" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              endIcon={<MoreHorizIcon />}
            ></Button>
            <Menu
              id="basic-menu-recent"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button-recent",
              }}
              sx={{
                "& .MuiList-root": {
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light" ? "#0f0f0f" : "#1d2125",
                },
              }}
            >
              <MenuList
                dense
                sx={{
                  "& > .MuiButtonBase-root": {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",

                    "& > .MuiListItemText-root": {
                      width: "100%",
                      "&:first-of-type": {
                        width: "max-content",
                        mr: 2,
                      },
                    },
                  },
                  color: "primary.main",
                }}
              >
                <MenuItem
                  sx={{
                    "&:hover": {
                      color: "success.light",
                      "& .add-card-icon": {
                        color: "success.light",
                      },
                    },
                  }}
                  onClick={toggleOpenNewCardForm}
                >
                  <ListItemText>
                    <AddCardIcon className="add-card-icon" fontSize="small" />
                  </ListItemText>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText>
                    <ContentCutIcon fontSize="small" />
                  </ListItemText>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText>
                    <ContentCopyIcon fontSize="small" />
                  </ListItemText>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText>
                    <ContentPasteIcon fontSize="small" />
                  </ListItemText>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>

                <Divider />

                <MenuItem
                  onClick={handleDeleteColumn}
                  sx={{
                    "&:hover": {
                      color: "error.dark",
                      "& .delete-forever-icon": {
                        color: "error.dark",
                      },
                    },
                  }}
                >
                  <ListItemText>
                    <DeleteForeverIcon
                      className="delete-forever-icon"
                      fontSize="small"
                    />
                  </ListItemText>
                  <ListItemText>Delete this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText>
                    <ArchiveIcon fontSize="small" />
                  </ListItemText>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>

        <ListCard auth={auth} board={board} cards={orderedCards} />
        <Box
          sx={{
            height: (theme) => theme.trelloCustom.columnFooterHeight,
            display: "flex",
            alignItems: "center",
            p: 1.25,
            // marginY: 1,
          }}
        >
          {!openNewCardForm ? (
            <Box
              sx={{
                gap: 1,
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button
                onClick={toggleOpenNewCardForm}
                sx={{
                  color: "primary.colorTextColumn",
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
                startIcon={<AddIcon />}
              >
                Add a card
              </Button>

              <Tooltip title="Create from template...">
                <Button
                  sx={{
                    padding: "0px 4px",
                    minWidth: "max-content !important",
                    color: "primary.colorTextColumn",
                    // "& .MuiButtonBase-root": {
                    //   min-width: "max-content !important"
                    // },
                    "& .MuiButton-endIcon": {
                      mr: 0,
                      ml: 0,
                      padding: "6px 4px",
                    },
                  }}
                  id="basic-button-recent"
                  aria-controls={open ? "basic-menu-recent" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  endIcon={<AddToPhotosIcon />}
                ></Button>
              </Tooltip>
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                padding: "4px 10px",
                borderRadius: "6px",
                backgroundColor: (theme) =>
                  theme.palette.mode === "light" ? "#fff" : "#1e1e1e",
                display: "flex",
                flexDirection: "row",
                gap: 1,
              }}
            >
              <TextField
                label="Enter column title ..."
                type="search"
                size="small"
                variant="outlined"
                autoFocus
                data-no-dnd="true"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
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
                    "&:hover": {
                      bgColor: (theme) => theme.palette.success.main,
                    },
                  }}
                  onClick={addNewCard}
                >
                  Add
                </Button>
                <CloseIcon
                  fontSize="small"
                  sx={{
                    color: "white",
                    cursor: "pointer",
                    color: (theme) => theme.palette.primary.colorTextColumn,
                    "&:hover": { color: (theme) => theme.palette.warning.main },
                  }}
                  onClick={toggleOpenNewCardForm}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default Column;
