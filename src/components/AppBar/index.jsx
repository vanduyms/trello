import Box from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";
import ModeSelect from "../../components/ModeSelect";
import AppsIcon from "@mui/icons-material/Apps";
import TrelloIcon from "~/assets/trello.svg?react";
import Typography from "@mui/material/Typography";
import Workspaces from "./Menus/Workspaces";
import Recent from "./Menus/Recent";
import Starred from "./Menus/Starred";
import Templates from "./Menus/Templates";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import TextField from "@mui/material/TextField";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Tooltip } from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Profiles from "./Menus/Profiles";

function AppBar() {
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trelloCustom.appBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        overflowX: "auto",
        bgcolor: (theme) =>
          theme.palette.mode === "light" ? "#0f0f0f" : "#1d2125",
        paddingX: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <AppsIcon sx={{ color: "primary.main" }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox
            fontSize="small"
            sx={{ color: "primary.main" }}
          />
          <Typography
            variant="span"
            sx={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "primary.main",
            }}
          >
            Trello
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            <Workspaces />
            <Recent />
            <Starred />
            <Templates />
            <Button
              variant="outlined"
              sx={{
                bgcolor: "primary.createBtnBg",
                color: "primary.textCreateBtnColor",
                "&:hover": {
                  bgcolor: "primary.createBtnBg_Hovered",
                },
              }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          id="outlined-search"
          label="Search field"
          type="search"
          size="small"
          sx={{ minWidth: "120px", bgcolor: "primary.searchBoxBg" }}
        />
        <ModeSelect />
        <Tooltip title="Notification">
          <Badge variant="dot" color="primary" sx={{ cursor: "pointer" }}>
            <NotificationsNoneOutlinedIcon
              sx={{ color: "primary.main", cursor: "pointer" }}
            />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineOutlinedIcon
            sx={{ color: "primary.main", cursor: "pointer" }}
          />
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  );
}

export default AppBar;
