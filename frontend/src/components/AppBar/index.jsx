import Box from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";
import ModeSelect from "../ModeSelect/ModeSelect";
import AppsIcon from "@mui/icons-material/Apps";
import TrelloIcon from "~/assets/trello.svg?react";
import Typography from "@mui/material/Typography";
import Recent from "./Menus/Recent";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Tooltip from "@mui/material/Tooltip";
// import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Profiles from "./Menus/Profiles";
import Link from "~/components/Link";
import Search from "./Search";
import { useMediaQuery } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function AppBar({ auth, boards }) {
  const tabletViewPort = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trelloCustom.appBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        // gap: 1,
        overflowX: "auto",
        bgcolor: (theme) => theme.palette.primary.appBarBgColor,
        paddingX: tabletViewPort ? "8px" : 2,
        borderBottom: "1px solid #9fadbc29",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* <AppsIcon sx={{ color: "primary.main" }} /> */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox
            fontSize="small"
            sx={{ color: "primary.main" }}
          />
          <Link href="/">
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
          </Link>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Recent boards={boards} />
            <Button
              variant="outlined"
              sx={{
                bgcolor: "primary.createBtnBg",
                color: "primary.textCreateBtnColor",
                "&:hover": {
                  bgcolor: "primary.createBtnBg_Hovered",
                },
                minWidth: tabletViewPort && "max-content !important",
                paddingX: tabletViewPort ? "4px" : 2,
              }}
            >
              {tabletViewPort ? <AddIcon /> : "Create"}
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: tabletViewPort ? "8px" : 1,
        }}
      >
        <Search boards={boards} />
        <ModeSelect />
        <Tooltip title="Notification">
          <Badge variant="dot" color="primary" sx={{ cursor: "pointer" }}>
            <NotificationsNoneOutlinedIcon
              sx={{ color: "primary.main", cursor: "pointer" }}
            />
          </Badge>
        </Tooltip>
        {/* <Tooltip title="Help">
          <HelpOutlineOutlinedIcon
            sx={{ color: "primary.main", cursor: "pointer" }}
          />
        </Tooltip> */}
        <Profiles auth={auth} />
      </Box>
    </Box>
  );
}

export default AppBar;
