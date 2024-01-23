import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useColorScheme } from "@mui/material";

function ModeSelect() {
  const { mode, setMode } = useColorScheme();
  const handleChange = (e) => {
    let modeTheme = e.target.value;
    setMode(modeTheme);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
      <InputLabel id="demo-select-small-label">Mode</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        label="Mode"
        value={mode}
        onChange={handleChange}
      >
        <MenuItem value={"light"}>Light</MenuItem>
        <MenuItem value={"dark"}>Dark</MenuItem>
        <MenuItem value={"system"}>System</MenuItem>
      </Select>
    </FormControl>
  );
}

export default ModeSelect;
