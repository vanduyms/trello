import React from "react";
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
import { mapOrder } from "~/utils/sort";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Column({ column }) {
  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, "_id");

  const [anchorEl, setAnchorEl] = React.useState(null);
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
                  color: "primary.main",
                }}
              >
                <MenuItem>
                  <ListItemText>Add card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText>Copy list</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText>Move list</ListItemText>
                </MenuItem>

                <Divider />

                <MenuItem>
                  <ListItemText>Create a rule</ListItemText>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>

        <ListCard cards={orderedCards} />
        <Box
          sx={{
            height: (theme) => theme.trelloCustom.columnFooterHeight,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Button
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
      </Box>
    </div>
  );
}

export default Column;
