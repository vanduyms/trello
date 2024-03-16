import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Board from "./pages/Boards/_id";

function App() {
  const userToken = localStorage.getItem("userToken");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Board />} />
      </Routes>
      {/* <Board /> */}
    </BrowserRouter>
  );
}

export default App;
