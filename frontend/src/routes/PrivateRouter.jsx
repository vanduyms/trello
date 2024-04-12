import Board from "./pages/Boards/_id";
import AllBoard from "./pages/Boards";
import Profile from "./pages/Users/_id";
import { Navigate } from "react-router-dom";

function PrivateRouter({ auth, boards }) {
  if (!auth.userToken) return <Navigate to="/" replace={true} />;
  return (
    <>
      <Route path="/board" element={<AllBoard auth={auth} boards={boards} />} />
      <Route
        path="/board/:id"
        element={<Board auth={auth} boards={boards} socket={socket} />}
      />
      <Route
        path="/user/:id"
        element={<Profile auth={auth} boards={boards} />}
      />
    </>
  );
}

export default PrivateRouter;
