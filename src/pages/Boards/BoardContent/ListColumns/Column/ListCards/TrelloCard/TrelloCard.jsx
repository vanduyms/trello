import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";
import Button from "@mui/material/Button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function TrelloCard({ card }) {
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
        // "&:last-child": { p: 1.5 },
        // overflow: "unset",
        // display: card?.FE_PlaceholderCard ? "none" : "block",
        overflow: card?.FE_PlaceholderCard ? "hidden" : "unset",
        height: card?.FE_PlaceholderCard ? "0px" : "unset",
      }}
    >
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} />}
      <CardContent
        sx={{
          color: "primary.colorTextColumn",
          p: 1.5,
          "&:last-child": { p: 1.5 },
        }}
      >
        <Typography variant="h7">{card?.title}</Typography>
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
