export class UIManager {
  constructor() {
    this.scoreDisplay = document.getElementById('score-display');
    this.missesDisplay = document.getElementById('misses-display');
  }

  updateScore(score) {
    if (this.scoreDisplay) {
      this.scoreDisplay.textContent = score;
    }
  }

  updateMisses(misses, maxMisses) {
    if (this.missesDisplay) {
      this.missesDisplay.textContent = `${misses}/${maxMisses}`;
    }
  }

  updateAll(state) {
    this.updateScore(state.getScore());
    this.updateMisses(state.getMisses(), state.maxMisses);
  }

}