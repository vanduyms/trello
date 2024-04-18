import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AttachmentIcon from "@mui/icons-material/Attachment";

function CardAttachment({ allAttachment }) {
  return (
    <Box sx={{ mb: "24px" }}>
      <Box sx={{ display: "flex", paddingY: 1, alignItems: "center" }}>
        <AttachmentIcon sx={{ margin: "4px", marginRight: "12px" }} />
        <Typography>Attachments</Typography>
      </Box>
      <Box>
        {allAttachment.map((attachment) => (
          <Typography>Att</Typography>
        ))}
      </Box>
    </Box>
  );
}

export default CardAttachment;
