import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { getBoardsOfOwner } from "~/redux/actions/boardAction";

function AllBoard() {
  const { auth, boards } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoardsOfOwner(auth.userInfo._id));
  }, []);
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "row",
          bgcolor: (theme) =>
            theme.palette.mode === "light" ? "white" : "#1d2125",
          height: "100%",
        }}
      >
        <Box sx={{ width: "100%", margin: "40px 16px 0" }}>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  textTransform: "uppercase",
                  fontWeight: 900,
                  color: "primary.titleColorBoard",
                  marginY: 2.5,
                }}
              >
                YOUR BOARDS
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant="contained"
                  startIcon={<PersonIcon />}
                  sx={{
                    backgroundColor: "primary.bgButtonBoard",
                    color: "primary.textButton",
                    "&:hover": {
                      backgroundColor: "primary.bgButtonBoard_Hovered",
                    },
                  }}
                >
                  Member (1)
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                paddingX: 2,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {boards.boards.map((board) => (
                <Box
                  sx={{
                    height: "120px",
                    width: { xs: "40%", sm: "30%", md: "20%", lg: "12%" },
                    borderRadius: "4px",
                    mr: 2,
                    bgcolor: "primary.bgItemBoard",
                    color: "white",
                    p: 1,
                    cursor: "pointer",

                    "&:hover": {
                      backgroundColor: "primary.bgItemBoard_Hovered",
                    },
                  }}
                >
                  <Typography variant="h7" fontWeight={900}>
                    {board.title}
                  </Typography>
                </Box>
              ))}
              <Box
                sx={{
                  height: "120px",
                  width: { xs: "40%", sm: "30%", md: "20%", lg: "12%" },
                  borderRadius: "4px",
                  p: 1,
                  mr: 2,
                  textAlign: "center",
                  display: "flex",
                  cursor: "pointer",
                  bgcolor: "primary.bgItemAddCardBoard",
                  color: "primary.black_white",

                  "&:hover": {
                    backgroundColor: "primary.bgItemAddCardBoard_Hovered",
                  },
                }}
              >
                <Typography
                  variant="h7"
                  fontWeight={400}
                  sx={{ margin: "auto" }}
                >
                  Create new card
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  textTransform: "uppercase",
                  fontWeight: 900,
                  color: "primary.titleColorBoard",
                  marginY: 2.5,
                }}
              >
                GUEST WORKSPACES
              </Typography>
            </Box>
            <Box
              sx={{
                paddingX: 2,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  height: "120px",
                  width: { xs: "40%", sm: "30%", md: "20%", lg: "12%" },
                  borderRadius: "4px",
                  mr: 2,
                  bgcolor: "primary.bgItemBoard",
                  color: "white",
                  p: 1,
                  cursor: "pointer",

                  "&:hover": {
                    backgroundColor: "primary.bgItemBoard_Hovered",
                  },
                }}
              >
                <Typography variant="h7" fontWeight={900}>
                  Board 1
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default AllBoard;
