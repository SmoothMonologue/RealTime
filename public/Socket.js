import { CLIENT_VERSION } from './Constants.js';

const socket = io('http://localhost:3000', {
  query: {
    clientVersion: CLIENT_VERSION,
  },
});

let userId = null;
export let stage_list = null;
export let item_list = null;
export let item_unlock_list = null;
socket.on('response', (data) => {
  console.log(data);
});

socket.on('connection', (data) => {
  console.log('connection: ', data);
  userId = data.uuid;

  //assets 중에서 stage의 data 가져오기
  stage_list = data.assets.stages.data;
  item_list = data.assets.items.data;
  item_unlock_list = data.assets.itemUnlocks.data;
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
