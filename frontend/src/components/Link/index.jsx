import { Link as MuiLink } from "@mui/material";
import { Link as ReactRouterLink } from "react-router-dom";

const Link = (props) => {
  return (
    <MuiLink
      sx={{ textDecoration: "none" }}
      {...props}
      component={ReactRouterLink}
      to={props.href ?? "#"}
    />
  );
};

export default Link;
