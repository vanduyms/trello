import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";

const MENU_STYLES = {
  color: "primary.main",
  bgcolor: "transparent",
  border: "none",
  borderRadius: "4px",
  "& .MuiSvgIcon-root": {
    color: "primary.main",
  },
  "&:hover": {
    bgcolor: "primary.50",
  },
};

function BoardBar({ board }) {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: (theme) =>
          theme.palette.mode === "light" ? "#0f0f0f" : "#1d2125",
        height: (theme) => theme.trelloCustom.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        paddingX: 2,
        overflowX: "auto",
        borderTop: "1px solid #9fadbc29",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label={board?.title}
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<PublicOutlinedIcon />}
          label={`${String(board?.type).charAt(0).toUpperCase()}${String(
            board?.type
          ).slice(1)}`}
          clickable
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          icon={<RocketLaunchOutlinedIcon />}
          label="Power-Ups"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltOutlinedIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListOutlinedIcon />}
          label="Filter"
          clickable
        />
        <AvatarGroup
          max={4}
          sx={{
            "& .MuiAvatar-root": {
              width: "34px",
              height: "34px",
              fontSize: 16,
              border: "none",
              cursor: "pointer",
              color: "white",
              // "&:first-of-type": {
              //   bgcolor: "#a4b0be",
              // },
            },
          }}
        >
          <Tooltip title="vanduyms">
            <Avatar
              alt="Van Duy"
              src="/static/images/avatar/1.jpg"
              sx={{ cursor: "pointer" }}
            />
          </Tooltip>
        </AvatarGroup>
        <Button variant="outlined" startIcon={<PersonAddAlt1OutlinedIcon />}>
          Share
        </Button>
      </Box>
    </Box>
  );
}

export default BoardBar;
