/* eslint-disable no-extra-boolean-cast */
import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import CardActivity from "./CardActivity";
import CardDescription from "./CardDescription";
import CardAttachment from "./CardAttachment";
import { updateCard } from "~/redux/actions/cardAction";
import LoadingIcon from "~/components/LoadingIcon";

import Modal from "@mui/material/Modal";
import { Typography } from "@mui/material";

function CardDetails({ show, setShow, auth, card, board, socket }) {
  const handleClose = (e) => {
    e.stopPropagation();
    setShow(false);
  };

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

  const dispatch = useDispatch();

  const handleUpdateCover = (cover) => {
    const id = card._id;
    const data = {
      boardId: card.boardId,
      columnId: card.columnId,
      title: card.title,
      cover: cover,
    };
    dispatch(updateCard({ board, id, data }));
  };

  const TransformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        handleUpdateCover(reader.result);
      };
    }
  };

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    // cover && TransformFile(file);
    TransformFile(file);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <Modal open={show} onClose={handleClose}>
      <Box sx={style}>
        <Card
          sx={{
            position: "relative",

            overflowY: "auto",
            borderRadius: 4,
            cursor: "auto",
            width: { xs: "98%", sm: 600, md: 600 },
            maxHeight: { xs: 600, sm: 800, md: 800 },
            margin: 1,
          }}
        >
          {card?.cover && (
            <Box
              sx={{
                width: "100%",
                height: 160,
                backgroundColor: "white",
                position: "relative",
              }}
            >
              <img
                srcSet={`${card?.cover}?w=161&fit=contain&auto=format&dpr=2 2x`}
                src={`${card?.cover}?w=161&fit=contain&auto=format`}
                alt={"Card cover"}
                loading="lazy"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                }}
              />
              <Typography
                sx={{
                  position: "absolute",
                  right: 20,
                  bottom: 0,
                  color: "#000 !important",
                }}
                variant="h6"
              >
                Cover
              </Typography>
            </Box>
          )}
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
              <CardDescription board={board} card={card} />
              {card.attachments.length > 0 && (
                <CardAttachment allAttachment={card.attachments} />
              )}
              <CardActivity
                auth={auth}
                board={board}
                card={card}
                socket={socket}
                setShow={setShow}
              />
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
                {board.loading ? (
                  <LoadingIcon />
                ) : (
                  <>
                    Cover
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handleUploadImage}
                    />
                  </>
                )}
              </Button>
              <Button variant="contained" startIcon={<AttachFileIcon />}>
                Attachment
              </Button>
            </Box>
          </CardContent>

          <Box
            variant="outlined"
            sx={{
              padding: "5px",
              position: "absolute",
              top: "22px",
              right: "15px",
            }}
            onClick={handleClose}
          >
            <CloseIcon sx={{ color: "primary.secondary" }} />
          </Box>
        </Card>
      </Box>
    </Modal>
  );
}

export default CardDetails;
