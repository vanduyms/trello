import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import io from "socket.io-client";
import { setSocket } from "~/redux/reducers/socketReducer";
import SocketClient from "./socket/SocketClient";
import { API_ROOT } from "~/utils/constants";
import PrivateRouter from "~/routes/PrivateRouter";
import AllBoard from "./pages/Boards";
import Board from "./pages/Boards/_id";
import Profile from "./pages/Users/_id";

function App() {
  const { auth, boards, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const socketIO = io(API_ROOT);
    dispatch(setSocket(socketIO));

    // return () => socketIO.close();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <SocketClient auth={auth} socket={socket} />
      <Routes>
        <Route path="/" element={<Login auth={auth} />} />
        <Route path="/register" element={<Register auth={auth} />} />
        <Route element={<PrivateRouter auth={auth} />}>
          <Route
            path="/board"
            element={<AllBoard auth={auth} boards={boards} />}
          />
          <Route
            path="/board/:id"
            element={<Board auth={auth} boards={boards} socket={socket} />}
          />
          <Route
            path="/user/:id"
            element={<Profile auth={auth} boards={boards} />}
          />
          <Route path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
