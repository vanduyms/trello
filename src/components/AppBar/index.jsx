import Box from "@mui/material/Box";
import ModeSelect from "../../components/ModeSelect";

function AppBar() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "primary.light",
        height: (theme) => theme.trelloCustom.appBarHeight,
        display: "flex",
        alignItems: "center",
      }}
    >
      <ModeSelect />
    </Box>
  );
}

export default AppBar;
