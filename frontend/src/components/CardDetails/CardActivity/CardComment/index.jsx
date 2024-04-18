import { useConfirm } from "material-ui-confirm";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, updateComment } from "~/redux/actions/cardAction";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

function CardComment({ comment, card, board, socket, setShow }) {
  const [commentEdited, setCommentEdited] = useState("");
  const [editComment, setEditComment] = useState(false);

  const confirmDeleteComment = useConfirm();
  const dispatch = useDispatch();

  const handleDeleteComment = (id) => {
    confirmDeleteComment({
      title: "Delete comment",
      description:
        "This action will permanently delete this comment! Are you sure ?",
      confirmationText: "Confirm",
      cancellationText: "Cancel",
    })
      .then(async () => {
        await dispatch(deleteComment({ board, card, id, socket }));
        setShow(true);
      })
      .catch();
  };

  const handleEditComment = (id) => {
    const data = { content: commentEdited };
    dispatch(updateComment({ board, card, id, data }));
  };

  return (
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
      <Box sx={{ pl: 5, display: "flex", flexDirection: "column" }}>
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
  );
}

export default CardComment;
