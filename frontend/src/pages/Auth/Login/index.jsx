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
import { userLogin } from "~/redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "~/components/Loading";

function Login({ auth }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = useState("");

  const handleClickShowPassword = (e) => {
    e.preventDefault();
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (auth.userToken) navigate("/board");
  }, [auth, navigate]);

  const handleLogin = () => {
    const data = { email, password };
    dispatch(userLogin(data));
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
                fontSize: "14px",

                "& input": {
                  color: "primary.colorTextColumn",

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
            <Button
              variant="contained"
              onClick={handleLogin}
              sx={{
                padding: 1,
                color: "#fff",
                backgroundColor: "#0052cc",
                "&:hover": {
                  backgroundColor: "#0065ff",
                },
              }}
            >
              Sign In
            </Button>
          </FormGroup>

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
            <Link to="/resetPassword">Forgot password ?</Link>
            <Link to="/register">Register</Link>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Login;
