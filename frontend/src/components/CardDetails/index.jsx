import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import NotesIcon from "@mui/icons-material/Notes";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import { ClickAwayListener } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCommentsFromCardId } from "~/redux/actions/cardAction";

function CardDetails({ setShow, card, board }) {
  const [comment, setComment] = useState("");
  const [description, setDescription] = useState("");

  const handleClose = (e) => {
    e.stopPropagation();
    setShow(false);
  };

  const dispatch = useDispatch();

  const { cards } = useSelector((state) => state);
  const cardComments = cards?.comments;

  console.log(cardComments);

  useEffect(() => {
    dispatch(getCommentsFromCardId(card._id));
  }, [card]);

  const column = board.columns.find((col) => col._id === card.columnId);

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
          }}
        >
          <CardHeader
            title={card.title}
            subheader={`in list ${column.title}`}
            sx={{
              "& .MuiCardHeader-title": {
                fontSize: "20px",
              },
              "& .MuiCardHeader-subheader": {
                fontSize: "16px",
              },
            }}
            avatar={<SpaceDashboardIcon />}
          />

          <CardContent
            sx={{
              display: "flex",
              width: "100%",
              gap: 1.5,
              "& .MuiInputBase-root": {
                borderRadius: 3,
              },
            }}
          >
            <Box
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "16px",
                },

                width: "100%",
              }}
            >
              <Box sx={{ mb: "24px" }}>
                <Box
                  sx={{ display: "flex", paddingY: 1, alignItems: "center" }}
                >
                  <NotesIcon sx={{ margin: "4px", marginRight: "12px" }} />
                  <Typography>Description</Typography>
                </Box>
                <TextField
                  multiline
                  rows={2}
                  placeholder="Add a more detailed description..."
                  sx={{ width: "100%", pl: 5 }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button
                  sx={{
                    ml: 5,
                    mt: 1,
                    backgroundColor: "primary.createBtnBg",
                    "&:hover": {
                      backgroundColor: "primary.createBtnBg_Hovered",
                    },
                    display: !!description ? "block" : "none",
                  }}
                  variant="contained"
                >
                  Save
                </Button>
              </Box>
              <Box sx={{ mb: "24px" }}>
                <Box
                  sx={{ display: "flex", paddingY: 1, alignItems: "center" }}
                >
                  <FormatListBulletedIcon
                    sx={{ margin: "4px", marginRight: "12px" }}
                  />
                  <Typography>Activity</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ width: 30, height: 30, mr: 1 }} />
                    <TextField
                      multiline
                      placeholder="Write a comment..."
                      sx={{ width: "100%" }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </Box>
                  <Button
                    sx={{
                      ml: 5,
                      mt: 1,
                      backgroundColor: "primary.createBtnBg",
                      "&:hover": {
                        backgroundColor: "primary.createBtnBg_Hovered",
                      },
                      display: !!comment ? "block" : "none",
                    }}
                    variant="contained"
                  >
                    Save
                  </Button>
                </Box>

                {cardComments.map((comment) => (
                  <Box sx={{ mb: 1, width: "100%" }} key={comment._id}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={comment.userAvatar}
                        sx={{ width: 30, height: 30, mr: "10px" }}
                      />
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          {comment.userDisplayName}
                        </Typography>
                        <Typography variant="h7" sx={{ ml: 1 }}>
                          {new Date(comment.createAt).toUTCString()}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ pl: 5 }}>
                      <TextField
                        placeholder="Write a comment..."
                        sx={{ width: "100%" }}
                        value={comment.content}
                        disabled
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                paddingY: 1,
              }}
            >
              <Button variant="contained" startIcon={<InsertPhotoIcon />}>
                Cover
              </Button>
              <Button variant="contained" startIcon={<AttachFileIcon />}>
                Attachment
              </Button>
            </Box>
          </CardContent>

          <Button
            variant="outlined"
            sx={{
              borderRadius: "50%",
              minWidth: 40,
              height: 40,
              padding: "5px",
              position: "absolute",
              top: "22px",
              right: "20px",
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </Button>
        </Card>
      </ClickAwayListener>
    </Box>
  );
}

export default CardDetails;
