import { Navigate, Outlet } from "react-router-dom";

function PrivateRouter({ auth }) {
  if (!auth.userToken) return <Navigate to="/" replace={true} />;
  return <Outlet />;
}

export default PrivateRouter;
