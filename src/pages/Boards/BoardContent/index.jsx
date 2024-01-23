import Box from "@mui/material/Box";
function BoardContent() {
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) =>
          `calc(100vh - ${theme.trelloCustom.appBarHeight} - ${theme.trelloCustom.boardBarHeight})`,
        backgroundColor: "primary.main",
        display: "flex",
        alignItems: "center",
      }}
    >
      Board content
    </Box>
  );
}

export default BoardContent;
