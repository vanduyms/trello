import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Avatar, Button, ClickAwayListener } from "@mui/material";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import SearchUser from "./SearchUser";
import InputAdornment from "@mui/material/InputAdornment";

function ShareBoard({ setShow, auth, board }) {
  const [emailSearch, setEmailSearch] = useState("");
  const [userShareAdded, setUserShareAdded] = useState([]);

  const handleClose = (e) => {
    e.stopPropagation();
    setShow(false);
  };

  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        zIndex: 100,
        top: 0,
        left: 0,
        background: "#00000099",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        cursor: "auto",
      }}
    >
      <ClickAwayListener onClickAway={handleClose}>
        <Card
          sx={{
            position: "relative",
            width: 600,
            borderRadius: 4,
            cursor: "auto",
            margin: 1,
          }}
        >
          <CardHeader
            title="Share Board"
            sx={{
              "& .MuiCardHeader-title": {
                fontSize: "24px",
              },
            }}
            action={
              <Box
                onClick={() => setShow(false)}
                sx={{
                  padding: "5px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  color: "primary.black_white",
                  display: "flex",
                  alignItems: "center",
                  position: "absolute",
                  top: 0,
                  right: 4,
                  transform: "translateY(45%)",
                }}
              >
                <CloseIcon />
              </Box>
            }
          />

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 1.5,
              "& .MuiTypography-root": {
                fontSize: "16px",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  sm: "row",
                  xs: "column",
                },
                width: "100%",
                gap: 1.5,
              }}
            >
              <Box sx={{ width: "100%", position: "relative" }}>
                <TextField
                  placeholder="Email address"
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-input": {
                      color: "primary.black_white",
                    },
                  }}
                  onClick={() => {}}
                  value={emailSearch}
                  onChange={(e) => setEmailSearch(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CloseIcon
                          fontSize="small"
                          sx={{
                            color: emailSearch ? "white" : "transparent",
                            cursor: "pointer",
                          }}
                          onClick={(e) => setEmailSearch("")}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <SearchUser
                  emailSearch={emailSearch}
                  setEmailSearch={setEmailSearch}
                  userShareAdded={userShareAdded}
                  setUserShareAdded={setUserShareAdded}
                />
              </Box>
              <TextField
                id="filled-select-currency-native"
                select
                defaultValue="Member"
                SelectProps={{
                  native: true,
                }}
                sx={{ width: 175 }}
                // onChange={(e) => setTypeBoard(e.target.value)}
              >
                <option sx={{ paddingY: "20px" }} value="public">
                  Member
                </option>
                {/* <option value="private">Private</option> */}
              </TextField>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "primary.createBtnBg",
                  "&:hover": {
                    backgroundColor: "primary.createBtnBg_Hovered",
                  },
                }}
              >
                Share
              </Button>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar src={board?.ownerUser[0]?.avatar} />
                <Box>
                  <Typography>{board?.ownerUser[0]?.fullName}</Typography>
                  <Typography>{`@${board?.ownerUser[0]?.username}`}</Typography>
                </Box>
              </Box>
              <TextField
                id="filled-select-currency-native"
                select
                defaultValue="Admin"
                SelectProps={{
                  native: true,
                }}
                // onChange={(e) => setTypeBoard(e.target.value)}
                disabled
              >
                <option sx={{ paddingY: "20px" }} value="public">
                  Admin
                </option>
                {/* <option value="private">Private</option> */}
              </TextField>
            </Box>

            {board.members.map((member) => (
              <Box
                key={member._id}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Avatar src={member?.avatar} />
                  <Box>
                    <Typography>{member?.fullName}</Typography>
                    <Typography>{`@${member?.username}`}</Typography>
                  </Box>
                </Box>
                <TextField
                  id="filled-select-currency-native"
                  select
                  defaultValue="Admin"
                  SelectProps={{
                    native: true,
                  }}
                  // onChange={(e) => setTypeBoard(e.target.value)}
                  disabled
                >
                  <option value="member">Member</option>
                  {/* <option value="private">Private</option> */}
                </TextField>
              </Box>
            ))}
          </CardContent>
        </Card>
      </ClickAwayListener>
    </Box>
  );
}

export default ShareBoard;
