import { sendEvent, stage_list, item_list } from './Socket.js';

class Score {
  score = 0;
  checkTime = 0;
  HIGH_SCORE_KEY = 'highScore';
  stageChange = true;
  stageLevel = 0;
  get_item_list = [];

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }

  update(deltaTime) {
    this.score += deltaTime * 0.001;
    this.checkTime += deltaTime * 0.001;
    // 점수가 100점씩 누적될 때마다 다음 스테이지로 넘어가며 서버에 메세지 전송
    if (
      Math.floor(this.score) > this.getCurrentStage(this.getStLv() + 1).score &&
      this.stageChange
    ) {
      sendEvent(11, {
        currentStage: this.getCurrentStage(this.getStLv()).id,
        targetStage: this.getCurrentStage(++this.stageLevel).id,
      });
    }
    //최고 레벨의 스테이지 통과 시 게임 클리어
    if (this.getStLv() >= stage_list.length) {
      this.stageChange = false;
    }
  }

  getItem(itemId) {
    //아이템을 먹을 때마다 점수 추가
    this.score += item_list[itemId - 1].score;
    //아이템을 먹을 때마다 획득 아이템 목록에 추가
    this.get_item_list.push(item_list[itemId - 1]);
  }

  checkScore() {
    let sumOfScore = 0;
    let preValue = Math.abs(this.score - this.checkTime);
    this.get_item_list.forEach((got) => {
      sumOfScore += got.score;
    });
    //총 점수와 게임 진행 시간의 차가 획득한 아이템 목록의 점수의 합과 같은지 검증
    return Math.abs(preValue - sumOfScore) < 0.5 ? 1 : 0;
  }

  reset() {
    this.score = 0;
    this.stageLevel = 0;
    this.checkTime = 0;
    this.get_item_list = [];
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  getScore() {
    return this.score;
  }

  getStLv() {
    return this.stageLevel;
  }

  getCurrentStage(level) {
    return stage_list[level];
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    const stageX = this.canvas.width - 790 * this.scaleRatio;
    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    //stage_list를 읽을 수 없어서 null로 받았을 경우 첫번째 스테이지의 아이디인 1000을 받는다.
    const stagePadded = stage_list
      ? this.getCurrentStage(this.getStLv()).id.toString().padStart(6, 0)
      : Math.floor(1000).toString().padStart(6, 0);
    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    //스테이지 표기 추가
    this.ctx.fillText(`Stage ${stagePadded}`, stageX, y);
    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}

export default Score;
