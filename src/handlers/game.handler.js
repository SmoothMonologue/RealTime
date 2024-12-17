import { getGameAssets } from '../init/asset.js';
import { clearStage, getStage, setStage } from '../models/stage.model.js';

export const gameStart = (uuid, payload) => {
  const { stages } = getGameAssets();
  clearStage(uuid);
  setStage(uuid, stages.data[0].id, payload.timestamp);
  console.log(`Stage: `, getStage(uuid));
  return { status: 'success' };
};

export const gameEnd = (uuid, payload) => {
  const { timestamp: gameEndTime, score } = payload;
  const stages = getStage(uuid);

  if (!stages.length) {
    return { status: 'fail', message: '이 유저에 해당하는 스테이지를 찾을 수 없음.' };
  }

  let totalScore = 0;
  stages.forEach((stage, index) => {
    let stageEndTime;
    if (index === stages.length - 1) {
      stageEndTime = gameEndTime;
    } else {
      stageEndTime = stages[index + 1].timestamp;
    }

    const stageDuration = (stageEndTime - stage.timestamp) / 1000;
    totalScore += stageDuration;
  });

  if (Math.abs(score - totalScore > 5)) {
    return { status: 'fail', message: '점수가 이게 맞나?' };
  }
  return { status: 'success', message: '게임 종료', score };
};
