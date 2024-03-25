import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import NotesIcon from "@mui/icons-material/Notes";
import { Avatar } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";

function CardDetails() {
  return (
    <Card
      sx={{
        position: "fixed",
        margin: "auto",
        top: "50%",
        left: "50%",
        width: 550,
      }}
    >
      <CardHeader
        title="Title"
        subheader="this is ...."
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

      <CardContent sx={{ display: "flex", width: "100%" }}>
        <Box
          sx={{
            "& .MuiSvgIcon-root": {
              mr: 2,
            },
            "& .MuiTypography-root": {
              fontSize: "16px",
            },
            "& .MuiInputBase-root": { padding: "8px 12px" },
            width: "100%",
          }}
        >
          <Box sx={{ mb: "24px" }}>
            <Box sx={{ display: "flex", paddingY: 1 }}>
              <NotesIcon />
              <Typography>Description</Typography>
            </Box>
            <TextField
              multiline
              rows={4}
              placeholder="Add a more detailed description..."
              sx={{ width: "100%" }}
            />
          </Box>
          <Box sx={{ mb: "24px" }}>
            <Box sx={{ display: "flex", paddingY: 1 }}>
              <FormatListBulletedIcon />
              <Typography>Activity</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar />
              <TextField
                multiline
                placeholder="Write a comment..."
                sx={{ width: "100%" }}
              />
            </Box>
          </Box>
        </Box>
        <Box></Box>
      </CardContent>
    </Card>
  );
}

export default CardDetails;
