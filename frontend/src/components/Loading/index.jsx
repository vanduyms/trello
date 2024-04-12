import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        width: "100vw",
        height: "100vh",
      }}
    >
      <CircularProgress color="secondary" />
      <Typography>Loading ...</Typography>
    </Box>
  );
}

export default Loading;
