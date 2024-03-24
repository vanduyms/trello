import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import CloseIcon from "@mui/icons-material/Close";
import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewBoard } from "~/redux/actions/boardAction";

function CreateBoardCard({ auth, show, setShow }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [typeBoard, setTypeBoard] = useState("public");

  const tabletViewPort = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const dispatch = useDispatch();

  const handleCreate = () => {
    const data = {
      title: title,
      description: description,
      type: typeBoard,
      ownerIds: auth.userInfo._id,
    };

    dispatch(createNewBoard(data));
    setShow(false);
  };
  if (show)
    return (
      <ClickAwayListener onClickAway={() => setShow(false)}>
        <Card
          sx={{
            position: !tabletViewPort ? "relative" : "absolute",
            right: tabletViewPort && 6,
            bottom: tabletViewPort && 6,
            bgcolor: "primary.bgItemAddCardBoard",
            color: "primary.black_white",
            width: 300,

            "& .MuiCardHeader-root": {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        >
          <CardHeader
            title="Create Board"
            titleTypographyProps={{ variant: "h6" }}
            sx={{
              textAlign: "center",
            }}
            action={
              <Box
                onClick={() => setShow(false)}
                sx={{
                  padding: "5px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#091e4224",
                  },
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
              fontSize: "12px",
              "& input": { padding: "8px 12px" },
              "& select": { padding: "8px 12px" },
              "& .MuiOutlinedInput-notchedOutline ": {
                borderColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "white !important"
                    : "black !important",
              },
            }}
          >
            <FormControl sx={{ paddingY: "10px" }}>
              <Typography>Board title</Typography>
              <TextField
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ paddingY: "10px" }}>
              <Typography>Board description</Typography>
              <TextField
                autoFocus
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ paddingY: "10px" }}>
              <Typography>Visibility</Typography>
              <TextField
                id="filled-select-currency-native"
                select
                defaultValue="Public"
                SelectProps={{
                  native: true,
                }}
                onChange={(e) => setTypeBoard(e.target.value)}
              >
                <option sx={{ padding: "20px 0" }} value="public">
                  Public
                </option>
                <option value="private">Private</option>
              </TextField>
            </FormControl>
          </CardContent>
          <CardActions
            sx={{ padding: "16px", display: "flex", justifyContent: "center" }}
          >
            <Button
              size="small"
              variant="contained"
              sx={{
                bgcolor: "#579dff",
                color: "white",
                "&:hover": {
                  bgcolor: "#85b8ff",
                },
              }}
              onClick={handleCreate}
            >
              Create
            </Button>
          </CardActions>
        </Card>
      </ClickAwayListener>
    );
}

export default CreateBoardCard;
