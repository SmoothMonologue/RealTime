import { Server as SocketIO } from 'socket.io';
import registerHandler from '../handlers/register.handler.js';

const initSocket = (server) => {
  const io = new SocketIO();
  io.attach(server);

  registerHandler(io);
  // 서버 수신
  // io.on('connection', (socket) => {
  //   // 서버 발신
  //   //io.emit('chat-message', { id: socket.id, msg: data });
  //   console.log(socket.id);
  //   socket.on('disconnect', () => {
  //     console.log(socket.id);
  //   });
  // });
};

export default initSocket;
