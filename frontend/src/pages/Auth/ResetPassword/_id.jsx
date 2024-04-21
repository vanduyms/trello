import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "~/redux/actions/authAction";
import { toast } from "react-toastify";
import LoadingIcon from "~/components/LoadingIcon";

import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormControl } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function ResetPassword({ auth }) {
  const query = useLocation();
  const infoResetPassword = query.pathname + query.search;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleResetPassword = async () => {
    if (password !== passwordConfirm) toast.error("Password is not match!");
    else dispatch(resetPassword({ infoResetPassword, password }));
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
        {!auth?.resetInfo?.user ? (
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
            <FormControl>
              <Typography variant="h7" sx={{ color: "#000", fontSize: 14 }}>
                Password
              </Typography>
              <OutlinedInput
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      sx={{ color: "#ccc !important" }}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {password &&
                        (showPassword ? <VisibilityOff /> : <Visibility />)}
                    </IconButton>
                  </InputAdornment>
                }
                required
              />
            </FormControl>
            <FormControl>
              <Typography variant="h7" sx={{ color: "#000", fontSize: 14 }}>
                Confirm password
              </Typography>
              <OutlinedInput
                placeholder="Enter your confirm password"
                type={showPasswordConfirm ? "text" : "password"}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      sx={{ color: "#ccc !important" }}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordConfirm}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {passwordConfirm &&
                        (showPasswordConfirm ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        ))}
                    </IconButton>
                  </InputAdornment>
                }
                required
              />
            </FormControl>
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
            <CheckCircleOutlineIcon sx={{ color: "#2afa00", fontSize: 60 }} />
            <Typography
              variant="h7"
              sx={{ color: "#000", textAlign: "center", mt: 1 }}
            >
              Password was reset successfully!
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/")}
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
              Login
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ResetPassword;
