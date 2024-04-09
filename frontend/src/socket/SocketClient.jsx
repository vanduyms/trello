import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBoard } from "~/redux/reducers/boardReducer";

const SocketClient = () => {
  const { auth, socket } = useSelector((state) => state);
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
