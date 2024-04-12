import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateBoard } from "~/redux/reducers/boardReducer";

const SocketClient = ({ auth, socket }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.socket?.emit("joinUser", auth.userInfo);
  }, [socket, auth?.userInfo]);

  useEffect(() => {
    socket.socket?.on("updateBoardToClient", (board) => {
      dispatch(updateBoard(board));
    });

    return () => socket.socket?.off("updateBoardToClient");
  }, [socket, dispatch, auth]);

  return <Fragment></Fragment>;
};

export default SocketClient;
