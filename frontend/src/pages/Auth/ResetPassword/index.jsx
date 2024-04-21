import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { sendResetPassword } from "~/redux/actions/authAction";
import { algorithms } from "~/utils/algorithm";
import { toast } from "react-toastify";
import LoadingIcon from "~/components/LoadingIcon";
import EmailIcon from "@mui/icons-material/Email";

function ForgotPassword({ auth }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    if (!algorithms.validateEmail(email)) {
      toast.error("Please enter an email address!");
    } else {
      dispatch(sendResetPassword(email));
    }
  };
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "white",
          boxShadow: 2,
          p: 4,
          width: "400px",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" sx={{ color: "#000", fontWeight: "bold" }}>
          Trello
        </Typography>
        {!auth?.resetInfo ? (
          <FormGroup
            sx={{
              display: "flex",
              gap: 2,
              py: 2,
              width: "100%",
              "& .MuiInputBase-root": {
                fontSize: "14px",
                "&:focus-within": {
                  "& > fieldset": {
                    borderColor: "black !important",
                  },
                },
                "&:hover": {
                  "& > fieldset": {
                    borderColor: "black",
                  },
                },

                "& input": {
                  color: "black",

                  paddingY: "10px",
                },

                "& > fieldset": {
                  borderColor: "black",
                },
              },
            }}
          >
            <OutlinedInput
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              required
            />
            <Button
              variant="contained"
              onClick={handleResetPassword}
              sx={{
                padding: 1,
                textTransform: "uppercase",
                color: "#fff",
                backgroundColor: "#0052cc",
                "&:hover": {
                  backgroundColor: "#0065ff",
                },
              }}
            >
              {auth?.loading ? <LoadingIcon /> : "Reset password"}
            </Button>
          </FormGroup>
        ) : (
          <Box
            sx={{
              paddingY: 2,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <EmailIcon sx={{ color: "#0081fa", fontSize: 60 }} />
            <Typography variant="h6" sx={{ color: "#000", fontWeight: "bold" }}>
              Check email for reset link
            </Typography>
            <Typography
              variant="h7"
              sx={{ color: "#000", textAlign: "center", mt: 1 }}
            >
              {`Pleasse check the email address ${email} for instructions to reset password`}
            </Typography>

            <Button
              variant="contained"
              onClick={handleResetPassword}
              sx={{
                mt: 2,
                width: "100%",
                textTransform: "uppercase",
                padding: 1,
                color: "#fff",
                backgroundColor: "#0052cc",
                "&:hover": {
                  backgroundColor: "#0065ff",
                },
              }}
            >
              {auth?.loading ? <LoadingIcon /> : "Resend email"}
            </Button>
          </Box>
        )}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            "& a": {
              color: "#0052cc",
              fontSize: 14,
              textDecoration: "none",
            },
          }}
        >
          <Link to="/">Login</Link>
        </Box>
      </Box>
    </Box>
  );
}

export default ForgotPassword;
