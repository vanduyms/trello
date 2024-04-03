import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button, ClickAwayListener } from "@mui/material";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

function ShareBoard({ setShow, auth }) {
  const handleClose = (e) => {
    e.stopPropagation();
    setShow(false);
  };

  const dispatch = useDispatch();

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
            title="Share Board"
            sx={{
              "& .MuiCardHeader-title": {
                fontSize: "24px",
              },
            }}
            action={
              <Box
                onClick={() => setShow(false)}
                sx={{
                  padding: "5px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  color: "primary.black_white",
                  display: "flex",
                  alignItems: "center",
                  position: "absolute",
                  top: 0,
                  right: 4,
                  transform: "translateY(45%)",
                }}
              >
                <CloseIcon />
              </Box>
            }
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
              "& .MuiTypography-root": {
                fontSize: "16px",
              },
            }}
          >
            <TextField
              placeholder="Email address"
              sx={{ width: "100%" }}
              onClick={() => {}}
              value={""}
              onChange={() => {}}
            />
            <TextField
              id="filled-select-currency-native"
              select
              defaultValue="Member"
              SelectProps={{
                native: true,
              }}
              sx={{ width: 175 }}
              // onChange={(e) => setTypeBoard(e.target.value)}
            >
              <option sx={{ paddingY: "20px" }} value="public">
                Member
              </option>
              {/* <option value="private">Private</option> */}
            </TextField>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "primary.createBtnBg",
                "&:hover": {
                  backgroundColor: "primary.createBtnBg_Hovered",
                },
              }}
            >
              Share
            </Button>
          </CardContent>
        </Card>
      </ClickAwayListener>
    </Box>
  );
}

export default ShareBoard;
