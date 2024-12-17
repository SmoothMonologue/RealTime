import express from 'express';
import { createServer } from 'http';
import initSocket from './init/socket.js';
import { loadGameAssets } from './init/asset.js';

const app = express();
const server = createServer(app);

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
initSocket(server);

app.get('/', (req, res) => {
  // 테스트를 위한 API 생성
  res.send('<h1>Hello World</h1>');
});

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    const assets = await loadGameAssets();
    console.log(assets);
    console.log('로딩 성공');
  } catch (e) {
    console.error('로딩 실패', e);
  }
});
