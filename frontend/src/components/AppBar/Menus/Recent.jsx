import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RecentlyViewed from "~/components/Board/RecentlyViewed";
import { Menu } from "@mui/material";

export default function Recent({ boards }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button-recent"
        aria-controls={open ? "basic-menu-recent" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ color: "primary.secondary" }}
      >
        Recent
      </Button>
      <Menu
        id="basic-menu-recent"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ "& .MuiPaper-root": { width: "200px", paddingX: "8px" } }}
      >
        <Box onClick={handleClose}>
          <RecentlyViewed
            boards={boards?.boardsRecentlyViewed}
            sx={{ position: "absolute" }}
          />
        </Box>
      </Menu>
    </div>
  );
}
