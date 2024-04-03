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
import { useDispatch } from "react-redux";
import { useConfirm } from "material-ui-confirm";
import { styled } from "@mui/material/styles";
import {
  createComment,
  deleteComment,
  updateComment,
} from "~/redux/actions/cardAction";
import { updateCard } from "~/redux/actions/cardAction";

function CardDetails({ setShow, auth, card, board }) {
  const [comment, setComment] = useState("");
  const [commentEdited, setCommentEdited] = useState("");
  const [editComment, setEditComment] = useState(false);
  const [changeDescription, setChangeDescription] = useState(false);
  const [description, setDescription] = useState(card?.description);
  const [cover, setCover] = useState("");

  const handleClose = (e) => {
    e.stopPropagation();
    setShow(false);
  };

  const dispatch = useDispatch();

  const column = board.columns.find((col) => col._id === card.columnId);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const TransformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setCover(reader.result);
      };
    } else {
      setCover("");
    }
  };

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    TransformFile(file);
  };

  const handleComment = () => {
    const data = {
      content: comment,
      cardId: card._id,
    };
    dispatch(createComment({ board, card, data }));
    setComment("");
  };

  const confirmDeleteComment = useConfirm();
  const handleDeleteComment = (id) => {
    confirmDeleteComment({
      title: "Delete comment",
      description:
        "This action will permanently delete this comment! Are you sure ?",
      confirmationText: "Confirm",
      cancellationText: "Cancel",
    })
      .then(async () => {
        await dispatch(deleteComment({ board, card, id }));
        setShow(true);
      })
      .catch();
  };

  const handleEditComment = (id) => {
    const data = { content: commentEdited };
    dispatch(updateComment({ board, card, id, data }));
  };

  const handleUpdateCard = () => {
    const id = card._id;
    const data = {
      boardId: card.boardId,
      columnId: card.columnId,
      title: card.title,
      description: description,
    };
    dispatch(updateCard({ board, id, data }));
    setChangeDescription(false);
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
              flexDirection: {
                sm: "row",
                xs: "column",
              },
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
                  onClick={() => setChangeDescription(true)}
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
                    display: !!changeDescription ? "block" : "none",
                  }}
                  variant="contained"
                  onClick={handleUpdateCard}
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
                    <Avatar
                      sx={{ width: 30, height: 30, mr: 1 }}
                      src={auth?.userInfo?.avatar}
                    />
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
                    onClick={handleComment}
                  >
                    Save
                  </Button>
                </Box>

                {card?.comments.map((comment) => (
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
                        <Typography sx={{ ml: 1, fontSize: "12px" }}>
                          {new Date(comment.createdAt).toUTCString()}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{ pl: 5, display: "flex", flexDirection: "column" }}
                    >
                      <TextField
                        placeholder="Write a comment..."
                        sx={{
                          width: "100%",
                          "& .MuiInputBase-input": {
                            color: "primary.colorText",
                          },
                        }}
                        value={!editComment ? comment.content : commentEdited}
                        onChange={(e) => {
                          setCommentEdited(e.target.value);
                        }}
                        disabled={!editComment}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          paddingY: "4px",
                        }}
                      >
                        {!editComment && (
                          <Box
                            sx={{
                              textDecoration: "underline",
                              fontSize: "14px",
                              mr: 1,
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setEditComment(true);
                              setCommentEdited(comment.content);
                            }}
                          >
                            Edit
                          </Box>
                        )}
                        {editComment && (
                          <Box
                            sx={{
                              textDecoration: "underline",
                              fontSize: "14px",
                              mr: 1,
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              handleEditComment(comment._id);
                              setEditComment(false);
                            }}
                          >
                            Save
                          </Box>
                        )}
                        <Box
                          sx={{
                            textDecoration: "underline",
                            fontSize: "14px",
                            mr: 1,
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteComment(comment._id);
                          }}
                        >
                          Delete
                        </Box>
                      </Box>
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
              <Button
                component="label"
                variant="contained"
                startIcon={<InsertPhotoIcon />}
              >
                Cover
                <VisuallyHiddenInput
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleUploadImage}
                />
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
