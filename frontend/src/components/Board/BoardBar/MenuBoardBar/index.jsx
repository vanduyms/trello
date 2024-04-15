import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

export default function MenuBoardBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Box sx={{ textAlign: "center", paddingY: "15px" }}>
        <Typography variant="h6">Menu</Typography>
        <Box
          sx={{
            cursor: "pointer",
            position: "absolute",
            right: "10px",
            top: "20px",
          }}
          onClick={() => setOpen(false)}
        >
          <CloseIcon />
        </Box>
      </Box>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary={"Delete board"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button
        variant="text"
        sx={{ paddingX: 0, maxWidth: "24px", minWidth: "24px" }}
        onClick={toggleDrawer(true)}
      >
        <MoreHorizIcon sx={{ color: "primary.secondary" }} />
      </Button>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          height: "theme.boardContentHeight",
          bottom: 0,
          top: "58px",
          display: "flex",
          "& .MuiPaper-root": {
            // backgroundColor: "primary.appBarBgColor",
          },
          "& .MuiBackdrop-root": {
            width: "0",
          },
          "& .MuiDrawer-paper": {
            top: "58px",

            "& .MuiList-root": {
              paddingY: 0,
            },
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
