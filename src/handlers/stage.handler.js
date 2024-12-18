import { getGameAssets } from '../init/asset.js';
import { getStage, setStage } from '../models/stage.model.js';

export const moveStageHandler = (userId, payload) => {
  //유저는 스테이지를 하나씩 올라갈 수 있다.
  let currentStage = getStage(userId);
  if (!currentStage.length) {
    return { status: 'fail', message: '이 유저의 스테이지 탐색 불가' };
  }
  currentStage.sort((a, b) => a.id - b.id);
  const currentStageId = currentStage[currentStage.length - 1].id;
  if (currentStageId !== payload.currentStage) {
    return { status: 'fail', message: '현재 스테이지 맞니?' };
  }

  const serverTime = Date.now();
  const elaspedTime = (serverTime - currentStage.timestamp) / 1000;
  let currentCutline = currentStage[currentStage.length - 1].score;

  //2스테이지로 넘어갈 때 체크
  if (elaspedTime < currentCutline || elaspedTime > currentCutline + 0.5) {
    return { status: 'fail', message: '못 넘어가유.' };
  }

  const { stages } = getGameAssets();
  if (!stages.data.some((stage) => stage.id === payload.targetStage)) {
    return { status: 'fail', message: '그 스테이지 맞니?' };
  }

  setStage(userId, payload.targetStage, serverTime);
  console.log('다음 스테이지로 넘어갑니다!');
  console.log(`Stage: `, getStage(userId));

  return { status: 'success' };
};
