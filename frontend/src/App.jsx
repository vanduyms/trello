import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Board from "./pages/Boards/_id";
import AllBoard from "~/pages/Boards";
import Profile from "~/pages/Users/_id";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import io from "socket.io-client";
import { setSocket } from "~/redux/reducers/socketReducer";
import SocketClient from "~/socket/SocketClient";
import { API_ROOT } from "~/utils/constants";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const socketIO = io(API_ROOT);
    dispatch(setSocket(socketIO));

    // return () => socketIO.close();
  }, [dispatch]);
  return (
    <BrowserRouter>
      <SocketClient />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/board" element={<AllBoard />} />
        <Route path="/board/:id" element={<Board />} />
        <Route path="/user/:id" element={<Profile />} />
      </Routes>
      {/* <Board /> */}
    </BrowserRouter>
  );
}

export default App;
