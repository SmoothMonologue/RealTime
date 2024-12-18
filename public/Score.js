import { sendEvent, stage_list, item_list } from './Socket.js';

class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  stageChange = true;
  stageLevel = 0;

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }

  update(deltaTime) {
    this.score += deltaTime * 0.001;
    // 점수가 10점씩 누적될 때마다 서버에 메세지 전송
    if (
      Math.floor(this.score) > this.getCurrentStage(this.getStLv() + 1).score &&
      this.stageChange
    ) {
      //this.stageChange = false;
      sendEvent(11, {
        currentStage: this.getCurrentStage(this.getStLv()).id,
        targetStage: this.getCurrentStage(++this.stageLevel).id,
      });
    }
  }

  getItem(itemId) {
    this.score += item_list[itemId - 1].score;
  }

  reset() {
    this.score = 0;
    this.stageLevel = 0;
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
    return stage_list != null ? stage_list[level] : stage_list[0];
    //return stage_list[level];
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

    const stagePadded = stage_list
      ? stage_list[this.stageLevel].id.toString().padStart(6, 0)
      : Math.floor(1000).toString().padStart(6, 0);

    //const stagePadded = this.getCurrentStage(this.getStLv()).id.toString().padStart(6, 0);
    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    this.ctx.fillText(`Stage ${stagePadded}`, stageX, y);
    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}

export default Score;
