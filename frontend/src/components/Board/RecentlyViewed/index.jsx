import { Box, Typography } from "@mui/material";
import Link from "~/components/Link";
import React from "react";

function RecentlyViewed({ boards }) {
  let boardsUpdated = boards;
  let hasTimeField = boards.some((item) => item.time !== undefined);
  if (hasTimeField) boardsUpdated = boards.map((item) => item.board);

  if (boards)
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
        }}
      >
        {boardsUpdated.map((item) => (
          <Link
            href={`/board/${item._id}`}
            key={item._id}
            sx={{ padding: "4px", textDecoration: "none", borderRadius: "6px" }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "14px",
                fontWeight: "800",
                color: "white",
              }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="h7"
              sx={{ fontSize: "12px", fontWeight: "400" }}
            >
              {item.description}
            </Typography>
          </Link>
        ))}
      </Box>
    );
}

export default RecentlyViewed;
