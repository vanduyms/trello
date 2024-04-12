import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useDispatch } from "react-redux";
import { userRegister } from "~/redux/actions/authAction";
import { Link, useNavigate } from "react-router-dom";
import Loading from "~/components/Loading";

function Login({ auth }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [checkPassword, setCheckPassword] = useState(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (auth.userToken) navigate("/board");
  }, [auth, navigate]);

  const handleRegister = () => {
    setCheckPassword(password === passwordConfirm);

    if (password === passwordConfirm) {
      const data = { email, password, username };
      dispatch(userRegister(data));
    }
  };

  if (auth.loading) {
    return <Loading />;
  } else {
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

          <FormGroup
            sx={{
              display: "flex",
              gap: 2,
              py: 2,
              width: "100%",
              "& .MuiInputBase-root": {
                border: "2px solid #ccc",
                color: "black",
                fontSize: "14px",

                "& input": {
                  paddingY: "10px",
                },
              },
            }}
          >
            <OutlinedInput
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              required
            />
            <OutlinedInput
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              required
            />
            <OutlinedInput
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
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
            <OutlinedInput
              placeholder="Enter your confirm password"
              type={showPasswordConfirm ? "text" : "password"}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
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
            <Typography color="red">
              {!checkPassword ? "Passwords do not match" : ""}
            </Typography>
            <Button
              variant="contained"
              onClick={handleRegister}
              disabled={!(email && password && passwordConfirm)}
              sx={{
                padding: 1,
                color: "#fff",
                backgroundColor: "#0052cc",
                "&:hover": {
                  backgroundColor: "#0065ff",
                },
              }}
            >
              Sign Up
            </Button>
          </FormGroup>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",

              "& a": {
                color: "#0052cc",
                fontSize: 14,
                textDecoration: "none",
              },
            }}
          >
            <Link to="/">Log In</Link>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Login;
