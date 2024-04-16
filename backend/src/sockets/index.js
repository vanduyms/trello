let users = [];

const SocketServer = (socket) => {
  socket.on('joinUser', (user) => {
    users.push({
      id: user?._id,
      socketId: socket?.id,
    });
  });

  socket.on('updateBoard', (board) => {
    const ids = [...board.memberIds, board.ownerIds];
    const clients = users.filter(user => ids.includes(user.id));

    if (clients.length > 0) {
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('updateBoardToClient', (board))
      })
    }
  });

  socket.on('deleteBoard', (board) => {
    const ids = [...board.memberIds, board.ownerIds];
    const clients = users.filter(user => ids.includes(user.id));

    if (clients.length > 0) {
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('updateBoardToClient', (board))
      })
    }
  });
  // socket.on('createComment', (board) => {
  //   const ids = [...board.memberIds, board.ownerIds];
  //   const clients = users.filter(user => ids.includes(user.id));

  //   if (clients.length > 0) {
  //     clients.forEach(client => {
  //       socket.to(`${client.socketId}`).emit('createCommentToClient', (board))
  //     })
  //   }
  // });

  // socket.on('deleteComment', ({ board, card, id }) => {
  //   const ids = [...board.memberIds, board.ownerIds];
  //   const clients = users.filter(user => ids.includes(user.id));

  //   if (clients.length > 0) {
  //     clients.forEach(client => {
  //       socket.to(`${client.socketId}`).emit('deleteCommentToClient', ({ board, card, data }))
  //     })
  //   }
  // });
}

export default SocketServer;