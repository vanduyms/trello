import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { updateCard, deleteCard } from "~/redux/actions/cardAction";
import { useDispatch, useSelector } from "react-redux";
import { useConfirm } from "material-ui-confirm";

function TrelloCard({ card }) {
  const { boards } = useSelector((state) => state);
  const board = boards.boardDetails;

  const [showEditCard, setShowEditCard] = useState(false);
  const [titleUpdate, setTitleUpdate] = useState(card?.title);
  const shouldShowCardActions = () => {
    return (
      !!card?.memberIds?.length ||
      !!card?.comments?.length ||
      !!card?.attachments?.length
    );
  };
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card._id, data: { ...card } });

  const dndKitCardStyles = {
    // touchAction: "none",
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? "1px solid #2ecc71" : undefined,
  };

  const dispatch = useDispatch();

  const handleUpdateCard = () => {
    const id = card?._id;
    const data = {
      boardId: card?.boardId,
      columnId: card?.columnId,
      title: titleUpdate,
    };
    dispatch(updateCard({ board, id, data }));

    setShowEditCard(false);
  };

  const confirmDeleteCard = useConfirm();
  const handleDeleteCard = () => {
    confirmDeleteCard({
      title: "Delete card",
      description:
        "This action will permanently delete your card ! Are you sure ?",
      confirmationText: "Confirm",
      cancellationText: "Cancel",
    })
      .then(() => dispatch(deleteCard({ board, card })))
      .catch();

    setShowEditCard(false);
  };

  return (
    <Card
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...listeners}
      sx={{
        maxWidth: 345,
        color: "primary.colorTextColumn",
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
        // overflow: "unset",
        // display: card?.FE_PlaceholderCard ? "none" : "block",
        overflow: card?.FE_PlaceholderCard ? "hidden" : "unset",
        height: card?.FE_PlaceholderCard ? "1px" : "unset",
        border: "1px solid transparent",

        "&:hover": {
          borderColor: "red",

          "#editButton": {
            display: "block",
          },
        },
      }}
    >
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} />}
      <CardContent
        sx={{
          color: "primary.colorTextColumn",
          p: !showEditCard && 1.5,
          width: "100%",
          "& .MuiButtonBase-root": {
            color: "primary.textCreateBtnColor",
            backgroundColor: "primary.createBtnBg",

            "&:hover": {
              backgroundColor: "primary.createBtnBg_Hovered",
            },
          },
          "&:last-child": {
            paddingBottom: !showEditCard && "12px",
          },
        }}
      >
        <Box
          sx={{
            display: showEditCard ? "none" : "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h7">{card?.title}</Typography>
          <Box
            id="editButton"
            sx={{
              display: "none",
              justifyContent: "space-between",
              width: "25px",
              height: "25px",
              alignItems: "center",
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "#282e33",
              },
            }}
            onClick={() => setShowEditCard(true)}
          >
            <CreateOutlinedIcon sx={{ padding: "4px 4px" }} />
          </Box>
        </Box>

        <Box
          sx={{
            display: showEditCard ? "flex" : "none",
            width: "100%",
          }}
        >
          <Box id="boxEdit" sx={{ width: "100%" }}>
            <FormControl
              sx={{
                width: "100%",
                zIndex: 100,
                padding: "-12px",
              }}
            >
              <TextField
                multiline={true}
                rows={2}
                defaultValue={titleUpdate}
                onChange={(e) => setTitleUpdate(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{
                  maxWidth: "40px",
                  position: "fixed",
                  transform: "translateY(80px)",
                }}
                onClick={handleUpdateCard}
              >
                Save
              </Button>
            </FormControl>

            <Box
              sx={{
                position: "fixed",
                transform: "translate(290px, -74px)",

                display: "flex",
                flexDirection: "column",
                gap: 0.5,

                zIndex: 100,
              }}
            >
              <Button variant="contained">Change Cover</Button>
              <Button variant="contained" onClick={handleDeleteCard}>
                Delete
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 11,
              background: "#00000099",
              cursor: "auto",
            }}
            onClick={() => setShowEditCard(false)}
          ></Box>
        </Box>
      </CardContent>
      {shouldShowCardActions() && (
        <CardActions sx={{ p: "0 4px 8px 4px" }}>
          {!!card?.memberIds.length && (
            <Button
              size="small"
              sx={{ color: "primary.colorTextColumn" }}
              startIcon={<GroupIcon />}
            >
              {card?.memberIds.length}
            </Button>
          )}
          {!!card?.comments.length && (
            <Button
              size="small"
              sx={{ color: "primary.colorTextColumn" }}
              startIcon={<CommentIcon />}
            >
              {card?.comments.length}
            </Button>
          )}
          {!!card?.attachments.length && (
            <Button
              size="small"
              sx={{ color: "primary.colorTextColumn" }}
              startIcon={<AttachmentIcon />}
            >
              {card?.attachments.length}
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
}

export default TrelloCard;
