export default class Frame {
  constructor(i, j) {
    if (i < 0 || j < 0) {
      throw new Error('Invalid Frame');
    }
    this.myFirstThrow = i;
    this.mySecondThrow = j;
  }

  firstThrow() {
    return this.myFirstThrow;
  }

  secondThrow() {
    return this.mySecondThrow;
  }

  isStrike() {
    return (this.myFirstThrow === 10);
  }

  sum() {
    return this.myFirstThrow + this.mySecondThrow;
  }

  isSpare() {
    return (!this.isStrike() && (this.myFirstThrow + this.mySecondThrow) === 10);
  }
}
