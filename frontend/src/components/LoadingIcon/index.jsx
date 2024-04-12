import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingIcon() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <CircularProgress color="secondary" size={24} />
    </Box>
  );
}

export default LoadingIcon;
