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

## 필수 기능 개발 체크리스트

- [x] 스테이지 구분 방법 정하기, 스테이지 넘어가는 로직 완성하기. ✅
- [x] 스테이지에 따라 다른 아이템 생성하기 ✅
- [x] 아이템을 획득하면 점수를 획득하기 ✅
- [x] 아이템에 따라 획득하는 점수 검증(먹은 아이템에 해당하는 점수를 획득했는가?), 올바른 스테이지가 맞는지 검증(후반에 해금되는 아이템을 미리 먹을 순 없다) ✅

## 도전 기능 개발 체크리스트

- [x] Broadcast 기능으로 최고 기록 경신할 때 전체 알림 보내기
- [x] uuid를 기준으로 가장 높은 점수 관리하기
- [x] Redis와 연동해서 게임 정보 저장하기
- [x] 프론트 엔드로 구현하기
