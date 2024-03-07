import CssBaseline from "@mui/material/CssBaseline";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import theme from "./theme.js";
import "./index.css";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";

// Config react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <App />
      <ToastContainer position="bottom-left" />
    </CssVarsProvider>
  </>
);
