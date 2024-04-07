import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";

const SocketClient = () => {
  const { socket } = useSelector((state) => state);

  useEffect(() => {
    socket.socket?.on("first_connect", (arg) => {
      console.log(arg);
    });
  }, [socket]);

  return <Fragment></Fragment>;
};

export default SocketClient;
