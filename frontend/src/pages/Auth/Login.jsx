import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "~/redux/actions/authAction";
import { useNavigate } from "react-router-dom";

function Login() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (auth.userToken) navigate("/home");
  }, [auth.userToken, navigate]);

  const handleLogin = async () => {
    const data = { email, password };
    dispatch(userLogin(data));
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

        <FormControl
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
                  {showPassword ? <VisibilityOff /> : <Visibility />}
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
            Login
          </Button>
        </FormControl>

        <Divider />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href="#" color="#0052cc" underline="none" fontSize={14}>
            Forgot password ?
          </Link>
          <Link href="#" color="#0052cc" underline="none" fontSize={14}>
            Register
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
