import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { getBoardsOfOwner } from "~/redux/actions/boardAction";
import { Navigate } from "react-router-dom";
import Link from "~/components/Link";
import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  TextField,
} from "@mui/material";

function AllBoard() {
  const { auth, boards } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoardsOfOwner(auth.userInfo._id));
  }, []);
  if (!auth.userToken) return <Navigate replace to="/" />;
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
              {boards.boardsIsOwner.map((board) => (
                <Link
                  key={board._id}
                  href={`/board/${board._id}`}
                  sx={{
                    height: "120px",
                    width: { xs: "40%", sm: "30%", md: "20%", lg: "12%" },
                    borderRadius: "4px",
                    mr: 2,
                    p: 1,
                    cursor: "pointer",
                    bgcolor: "primary.bgItemBoard",
                    color: "white",

                    "&:hover": {
                      backgroundColor: "primary.bgItemBoard_Hovered",
                    },
                  }}
                >
                  <Box>
                    <Typography variant="h7" fontWeight={900}>
                      {board.title}
                    </Typography>
                  </Box>
                </Link>
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

              <Card
                sx={{
                  position: "fixed",
                  transform: "translate(300px, 0px)",

                  maxWidth: 345,
                }}
              >
                <CardHeader title="Create Board" />
                <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                  <FormControl>
                    <Typography>Board title</Typography>
                    <TextField />
                  </FormControl>
                  <FormControl>
                    <Typography>Visibility</Typography>
                    <TextField
                      id="filled-select-currency-native"
                      select
                      defaultValue="Public"
                      SelectProps={{
                        native: true,
                      }}
                      // variant="filled"
                    >
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                    </TextField>
                  </FormControl>
                </CardContent>
              </Card>
            </Box>
          </Box>
          {boards.boardsIsMember.length > 0 && (
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
                {boards.boardsIsMember.map((board) => (
                  <Link
                    key={board._id}
                    href={`/board/${board._id}`}
                    sx={{
                      height: "120px",
                      width: { xs: "40%", sm: "30%", md: "20%", lg: "12%" },
                      borderRadius: "4px",
                      mr: 2,
                      p: 1,
                      cursor: "pointer",
                      bgcolor: "primary.bgItemBoard",
                      color: "white",

                      "&:hover": {
                        backgroundColor: "primary.bgItemBoard_Hovered",
                      },
                    }}
                  >
                    <Box>
                      <Typography variant="h7" fontWeight={900}>
                        {board.title}
                      </Typography>
                    </Box>
                  </Link>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default AllBoard;
