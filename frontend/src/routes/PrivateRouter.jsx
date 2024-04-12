import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRouter({ children }) {
  const { auth } = useSelector((state) => state);
  if (!auth.userToken) return <Navigate to="/" replace={true} />;
  return children;
}

export default PrivateRouter;
