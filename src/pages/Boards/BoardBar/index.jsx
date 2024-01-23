import Box from "@mui/material/Box";

function BoardBar() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "primary.dark",
        height: (theme) => theme.trelloCustom.boardBarHeight,
        display: "flex",
        alignItems: "center",
      }}
    >
      Board bar
    </Box>
  );
}

export default BoardBar;
