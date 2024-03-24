import { Box, Typography } from "@mui/material";
import Link from "~/components/Link";
import React from "react";

function RecentlyViewed({ boards }) {
  const allBoardRecentViewed = boards.boardsRecentlyViewed;
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
      }}
    >
      {allBoardRecentViewed.map((item) => (
        <Link
          href={`/board/${item.board._id}`}
          key={item.board._id}
          sx={{ paddingY: "4px", textDecoration: "none" }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "14px",
              fontWeight: "800",
              color: "white",
            }}
          >
            {item.board.title}
          </Typography>
          <Typography variant="h7" sx={{ fontSize: "12px", fontWeight: "400" }}>
            {item.board.description}
          </Typography>
        </Link>
      ))}
    </Box>
  );
}

export default RecentlyViewed;
