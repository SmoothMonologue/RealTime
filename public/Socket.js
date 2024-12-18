import { CLIENT_VERSION } from './Constants.js';

const socket = io('http://localhost:3000', {
  query: {
    clientVersion: CLIENT_VERSION,
  },
});

let userId = null;
let stage_list = null;
let item_list = null;
//let item_unlock_list = null;
socket.on('response', (data) => {
  console.log(data);
});

socket.on('connection', (data) => {
  console.log('connection: ', data);
  userId = data.uuid;

  //assets 중에서 stage의 data 가져오기
  stage_list = data.assets.stage.data;
  //item_list = data.getGameAssets();
  // item_unlock_list = data.gameAssets.itemUnlocks;
});

const sendEvent = (handlerId, payload) => {
  socket.emit('event', {
    userId,
    clientVersion: CLIENT_VERSION,
    handlerId,
    payload,
  });
};

export { sendEvent };
