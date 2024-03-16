import CssBaseline from "@mui/material/CssBaseline";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import theme from "./theme.js";
import "./index.css";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { Provider } from "react-redux";

// Config react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ConfirmProvider } from "material-ui-confirm";
import { store } from "~/redux/stores.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <CssVarsProvider theme={theme}>
      <ConfirmProvider
        defaultOptions={{
          allowClose: false,
          dialogProps: { maxWidth: "xs" },
          confirmationButtonProps: {
            color: "secondary",
            variant: "outlined",
          },
          cancellationButtonProps: { color: "inherit" },
        }}
      >
        <CssBaseline />
        <App />
        <ToastContainer position="bottom-left" />
      </ConfirmProvider>
    </CssVarsProvider>
  </Provider>
);
