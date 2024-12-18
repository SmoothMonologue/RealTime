import { CLIENT_VERSION } from '../constants.js';
import { getGameAssets } from '../init/asset.js';
import { createStage, getStage, setStage } from '../models/stage.model.js';
import { getUser, removeUser } from '../models/user.model.js';
import handlerMappings from './handlerMapping.js';

export const handleDisconnect = (socket, uuid) => {
  console.log(`유저 접속 해제: ${socket.id}`);
  removeUser(socket.id);
  console.log(`현재 접속 중: `, getUser());
};

export const handleConnection = (socket, uuid) => {
  console.log(`유저 접속: ${uuid}`);
  console.log(`현재 접속 중: `, getUser());

  createStage(uuid);
  socket.emit('connection', { uuid });
};

export const handleEvent = (io, socket, data) => {
  if (!CLIENT_VERSION.includes(data.clientVersion)) {
    socket.emit('response', { status: 'fail', message: '클라이언트 버전 불일치' });
    return;
  }

  const handler = handlerMappings[data.handlerId];
  if (!handler) {
    socket.emit('response', { status: 'fail', message: '클라이언트 버전 불일치' });
    return;
  }

  const response = handler(data.userId, data.payload);
  if (response.broadcast) {
    io.emit('response', 'broadcast');
    return;
  }
  socket.emit('response', response);
};
