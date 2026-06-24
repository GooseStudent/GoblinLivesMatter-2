export class GameState {
  constructor(maxMisses = 5) {
    this.score = 0;
    this.misses = 0;
    this.maxMisses = maxMisses;
    this.isRunning = false;
    this.currentPosition = -1;
  }

  reset() {
    this.score = 0;
    this.misses = 0;
    this.currentPosition = -1;
  }

  addScore() {
    this.score += 1;
  }

  addMiss() {
    this.misses += 1;
  }

  isGameOver() {
    return this.misses >= this.maxMisses;
  }

  getScore() {
    return this.score;
  }

  getMisses() {
    return this.misses;
  }

  getMissesText() {
    return `${this.misses}/${this.maxMisses}`;
  }
}