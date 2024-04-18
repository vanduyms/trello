import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardComment from "./CardComment";

import { createComment } from "~/redux/actions/cardAction";
import { useDispatch } from "react-redux";

function CardActivity({ auth, board, card, socket, setShow }) {
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const handleComment = () => {
    const data = {
      content: comment,
      cardId: card._id,

      userId: auth.userInfo._id,
      userEmail: auth.userInfo.email,
      userAvatar: auth.userInfo.avatar,
      userDescription: auth.userInfo.fullName,
      userDisplayName: auth.userInfo.username,
    };
    dispatch(createComment({ board, card, data, socket }));
    setComment("");
  };
  return (
    <Box sx={{ mb: "24px" }}>
      <Box sx={{ display: "flex", paddingY: 1, alignItems: "center" }}>
        <FormatListBulletedIcon sx={{ margin: "4px", marginRight: "12px" }} />
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
        <CardComment
          comment={comment}
          key={comment._id}
          board={board}
          card={card}
          socket={socket}
          setShow={setShow}
        />
      ))}
    </Box>
  );
}

export default CardActivity;
