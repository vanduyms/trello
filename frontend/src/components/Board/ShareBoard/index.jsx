import { useState } from "react";
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
import { shareBoard } from "~/redux/actions/boardAction";
import LoadingIcon from "~/components/LoadingIcon";

function ShareBoard({ setShow, boards }) {
  const board = boards.boardDetails;
  const [emailSearch, setEmailSearch] = useState("");
  const [userShareAdded, setUserShareAdded] = useState([]);

  const handleClose = (e) => {
    e.stopPropagation();
    setShow(false);
  };

  const dispatch = useDispatch();

  const handleRemoveUserShare = (id) => {
    const updateUserShareAdded = userShareAdded.filter(
      (user) => user._id !== id
    );
    setUserShareAdded(updateUserShareAdded);
  };

  const handleShareBoard = () => {
    const boardId = board._id;
    dispatch(shareBoard({ boardId, userShareAdded }));
  };

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
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "primary.black_white",
                  paddingX: 2,
                  borderRadius: 1,
                }}
              >
                {userShareAdded.map((user) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      backgroundColor: "primary.bgButtonBoard",
                      borderRadius: 1,
                      padding: "4px 12px",
                    }}
                    key={user._id}
                  >
                    <Typography>{user.username}</Typography>
                    <CloseIcon
                      fontSize="small"
                      sx={{
                        color: "primary.colorTextColumn",
                        cursor: "pointer",
                      }}
                      onClick={() => handleRemoveUserShare(user._id)}
                    />
                  </Box>
                ))}
                <TextField
                  placeholder={userShareAdded.length ? "" : "Email address"}
                  autoFocus={true}
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-input": {
                      color: "primary.black_white",
                    },
                    "& .MuiOutlinedInput-root": {
                      paddingRight: 0,
                    },

                    "& input": {
                      paddingX: userShareAdded ? "8px" : 0,
                    },

                    "& fieldset": {
                      border: "none",
                      outline: "none",
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
                          onClick={() => setEmailSearch("")}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <SearchUser
                  board={board}
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
                <option value="public">Member</option>
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
                onClick={handleShareBoard}
              >
                {boards.loading ? <LoadingIcon /> : "Share"}
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
                <option value="public">Admin</option>
                {/* <option value="private">Private</option> */}
              </TextField>
            </Box>

            {boards.loading ? (
              <LoadingIcon />
            ) : (
              board.members.map((member) => (
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
              ))
            )}
          </CardContent>
        </Card>
      </ClickAwayListener>
    </Box>
  );
}

export default ShareBoard;
