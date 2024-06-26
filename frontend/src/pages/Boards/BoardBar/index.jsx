import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
// import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
// import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { useMediaQuery } from "@mui/material";
import ShareBoard from "~/components/Board/ShareBoard";
import { useState } from "react";
import MenuBoardBar from "~/components/Board/BoardBar/MenuBoardBar";

const MENU_STYLES = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
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

function BoardBar({ boards, socket }) {
  const board = boards.boardDetails;
  const memberOfBoard = [...board.ownerUser, ...board.members];
  const mobileViewPort = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const tabletViewPort = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [showShareBoard, setShowShareBoard] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: (theme) =>
          theme.palette.mode === "light" ? "#0f0f0f" : "#1d2125",
        height: mobileViewPort
          ? "auto"
          : (theme) => theme.trelloCustom.boardBarHeight,
        display: "inline-flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: mobileViewPort ? "4px" : 2,
        padding: "8px 16px",
        overflowX: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: tabletViewPort ? 1 : 2,
          maxWidth: "100%",
          flexWrap: "nowrap",
        }}
      >
        <Tooltip title={board?.description}>
          <Chip
            icon={<DashboardIcon />}
            label={board?.title}
            clickable
            sx={MENU_STYLES}
          />
        </Tooltip>
        <Chip
          sx={{
            ...MENU_STYLES,
            width: !tabletViewPort ? "auto" : "32px",
            "& .MuiSvgIcon-root": {
              marginLeft: "17px",
            },
          }}
          icon={<PublicOutlinedIcon />}
          label={
            !tabletViewPort &&
            `${String(board?.type).charAt(0).toUpperCase()}${String(
              board?.type
            ).slice(1)}`
          }
          clickable
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1,
          flexWrap: "nowrap",
          position: "relative",
          marginLeft: "auto",
        }}
      >
        {/* <Chip
          sx={{
            ...MENU_STYLES,
            width: !tabletViewPort ? "auto" : "32px",
            "& .MuiSvgIcon-root": {
              marginLeft: "17px",
            },
          }}
          icon={<RocketLaunchOutlinedIcon />}
          label={!tabletViewPort && "Power-Ups"}
          clickable
          size="medium"
        />
        <Chip
          sx={{
            ...MENU_STYLES,
            width: !tabletViewPort ? "auto" : "32px",
            "& .MuiSvgIcon-root": {
              marginLeft: "17px",
            },
          }}
          icon={<BoltOutlinedIcon />}
          label={!tabletViewPort && "Automation"}
          clickable
        /> */}
        <Chip
          sx={{
            ...MENU_STYLES,
            width: !mobileViewPort ? "auto" : "32px",
            "& .MuiSvgIcon-root": {
              marginLeft: "17px",
            },
          }}
          icon={<FilterListOutlinedIcon />}
          label={!mobileViewPort && "Filter"}
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
          {memberOfBoard.map((member) => (
            <Tooltip title={member?.username} key={member._id}>
              <Avatar
                alt={member?.fullName}
                src={member?.avatar}
                sx={{ cursor: "pointer" }}
              />
            </Tooltip>
          ))}
        </AvatarGroup>
        <Button
          variant="outlined"
          startIcon={<PersonAddAlt1OutlinedIcon />}
          sx={{ color: "primary.secondary" }}
          onClick={() => setShowShareBoard(true)}
        >
          Share
        </Button>
        <MenuBoardBar board={board} socket={socket} />
      </Box>
      {showShareBoard && (
        <ShareBoard
          show={showShareBoard}
          setShow={setShowShareBoard}
          boards={boards}
        />
      )}
    </Box>
  );
}

export default BoardBar;
