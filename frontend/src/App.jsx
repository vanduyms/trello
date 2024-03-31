import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Board from "./pages/Boards/_id";
import BoardHome from "~/pages/Boards";
import Profile from "~/pages/Users/_id";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/board" element={<BoardHome />} />
        <Route path="/board/:id" element={<Board />} />
        <Route path="/user/:id" element={<Profile />} />
      </Routes>
      {/* <Board /> */}
    </BrowserRouter>
  );
}

export default App;
