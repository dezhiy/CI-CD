export default class Game {
  constructor() {
    this.frames = [];
    this.bonusThrow = 0;
    this.bonusThrows = [];
    this.gameSize = 10;
  }

  addFrame(frame) {
    this.frames.push(frame);
  }

  score() {
    let gameScore = 0;
    for (let i = 0; i < 10; i += 1) {
      gameScore += this.frameScore(i + 1);
    }
    return gameScore;
  }

  isStrike(i) {
    return this.frames[i - 1].isStrike();
  }

  bonusThrowsScores() {
    let total = 0;
    for (let i = 0; i < 2; i += 1) {
      total += this.bonusThrows[i] || 0;
    }
    return total;
  }

  frameScore(i) {
    if (i < this.gameSize && this.frames[i].isStrike() && this.frames[i - 1].isStrike()) {
      if (i + 1 === 10) {
        return (this.frames[i - 1].sum() + this.frames[i].sum()) + this.bonusThrows[0];
      }
      return (this.frames[i - 1].sum() + this.frames[i].sum() + this.frames[i + 1].firstThrow());
    }

    if (this.frames[i - 1].isStrike()) {
      if (i < this.gameSize) {
        return (this.frames[i - 1].sum() + this.frames[i].sum());
      }
      return this.frames[i - 1].sum() + this.bonusThrowsScores();
    }

    if (i < this.gameSize && this.frames[i - 1].isSpare() && this.frames[i].isSpare()) {
      return this.frames[i - 1].sum();
    }

    if (this.frames[i - 1].isSpare()) {
      if (i < this.gameSize) {
        return (this.frames[i - 1].sum() + this.frames[i].firstThrow());
      }
      return this.frames[i - 1].sum() + this.bonusThrowsScores();
    }
    return this.frames[i - 1].sum();
  }

  isSpare(i) {
    return this.frames[i - 1].isSpare();
  }

  addBonusThrow(bonusThrow) {
    this.bonusThrows[this.bonusThrow] = bonusThrow;
    this.bonusThrow += 1;
  }
}
