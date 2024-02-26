import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useColorScheme } from "@mui/material";
import Box from "@mui/material/Box";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness6Icon from "@mui/icons-material/Brightness6";

function ModeSelect() {
  const { mode, setMode } = useColorScheme();
  const handleChange = (e) => {
    let modeTheme = e.target.value;
    setMode(modeTheme);
  };
  return (
    <FormControl size="small" sx={{ minWidth: "120px" }}>
      <InputLabel id="demo-select-small-label">Mode</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        label="Mode"
        value={mode}
        onChange={handleChange}
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
