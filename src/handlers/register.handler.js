import { addUser } from '../models/user.model.js';
import { v4 as uuidv4 } from 'uuid';
import { handleConnection, handleDisconnect, handleEvent } from './helper.js';

const registerHandler = (io) => {
  io.on('connection', (socket) => {
    const userUUID = uuidv4();
    addUser({ uuId: userUUID, socketId: socket.id });

    handleConnection(socket, userUUID);

    socket.on('event', (data) => handleEvent(io, socket, data));
    //접속 해제 시
    socket.on('disconnect', () => handleDisconnect(socket, userUUID));
  });
};
export default registerHandler;
