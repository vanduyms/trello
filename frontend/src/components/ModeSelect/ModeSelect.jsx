import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useColorScheme, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness6Icon from "@mui/icons-material/Brightness6";

function ModeSelect() {
  const tabletViewPort = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const { mode, setMode } = useColorScheme();
  const handleChange = (e) => {
    let modeTheme = e.target.value;
    setMode(modeTheme);
  };

  const handleToggleTheme = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  if (tabletViewPort)
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "4px",
          borderRadius: "50%",
          "&:hover": { backgroundColor: "#cccccc3e" },
          cursor: "pointer",
          color: "primary.main",
        }}
        onClick={handleToggleTheme}
      >
        {mode === "dark" ? <DarkModeIcon /> : <Brightness6Icon />}
      </Box>
    );
  else
    return (
      <FormControl size="small" sx={{ minWidth: "120px" }}>
        <InputLabel id="demo-select-small-label">Mode</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          label="Mode"
          value={mode}
          onChange={handleChange}
          sx={{
            color: "primary.main",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff",
            },
          }}
        >
          <MenuItem value={"light"}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LightModeIcon fontSize="small" />
              Light
            </Box>
          </MenuItem>
          <MenuItem value={"dark"}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <DarkModeIcon fontSize="small" />
              Dark
            </Box>
          </MenuItem>
          <MenuItem value={"system"}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Brightness6Icon fontSize="small" />
              System
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    );
}

export default ModeSelect;
