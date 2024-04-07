let users = [];

const SocketServer = (socket) => {
  socket.on('joinUser', (user) => {
    users.push({
      id: user._id,
      socketId: socket.id,
    });
  });
}

export default SocketServer;