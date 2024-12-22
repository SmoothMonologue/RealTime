# 웹소켓 게임 만들기

### 디렉토리 구조

```
Websocket
├─ .gitignore
├─ .prettierrc
├─ package-lock.json
├─ package.json
├─ public
├─ readme.md
├─ assets
   ├─ item_unlock.json
   ├─ item.json
   ├─ stage.json
└─ src
   ├─ app.js
   ├─ constants.js
   ├─ handlers
   │  ├─ game.handler.js
   │  ├─ handlerMapping.js
   │  ├─ helper.js
   │  ├─ register.handler.js
   │  └─ stage.handler.js
   ├─ init
   │  ├─ asset.js
   │  └─ socket.js
   └─ models
      ├─ stage.model.js
      └─ user.model.js
```

## 핸들러

```js
const handlerMappings = {
  2: gameStart,
  3: gameEnd,
  11: moveStageHandler,
};
```

## 게임 소개

### 게임 규칙

- 게임 시간(좌측 상단)이 1초 지날 때마다 점수가 1씩 증가합니다.</br>
- 아이템을 먹을 때마다 점수가 증가합니다.
- 특정 점수에 도달하면 다음 스테이지로 넘어갑니다.
- 바뀐 스테이지에 따라 점수가 다른 아이템들이 등장할 수도 있습니다.
- 한 번 부딪히면 게임 오버.
- 마지막 스테이지에 도달하면 백야를 맞이합니다. ~~사실 오류입니다.~~
