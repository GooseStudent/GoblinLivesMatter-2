import goblinImage from "../img/goblin.png";
import { gameConfig } from "../config";
import { Random } from "../utils/Random";
import { GameState } from "./GameState";
import { UIManager } from "../ui/UIManager";
import { GameOver } from "../ui/GameOver";

export default class Game {
  constructor(fieldSize = gameConfig.fieldSize) {
    this.fieldSize = fieldSize;
    this.moveDelay = gameConfig.moveDelayMs;
    this.maxMisses = gameConfig.maxMisses;
    
    this.fieldElement = document.getElementById("game-field");
    this.goblinElement = null;
    this.intervalId = null;
    
    // Состояния и UI
    this.state = new GameState(this.maxMisses);
    this.ui = new UIManager();
    this.gameOverScreen = new GameOver(this.fieldElement);

    this.init();
  }

  init() {
    this.createField();
    this.createGoblin();
    this.addGoblinClickListener();
    this.ui.updateAll(this.state);
  }

  createField() {
    this.fieldElement.innerHTML = "";
    for (let i = 0; i < this.fieldSize * this.fieldSize; i += 1) {
      const hole = document.createElement("div");
      hole.className = "hole";
      hole.dataset.index = i;
      this.fieldElement.append(hole);
    }
  }

  createGoblin() {
    this.goblinElement = document.createElement("img");
    this.goblinElement.src = goblinImage;
    this.goblinElement.className = "goblin";
    this.goblinElement.alt = "Goblin";
    this.goblinElement.draggable = false;
  }

  addGoblinClickListener() {
    this.goblinElement.addEventListener("click", (event) => {
      event.stopPropagation();
      
      if (!this.state.isRunning || this.gameOverScreen.isVisible()) {
        return;
      }

      // Попадание
      this.state.addScore();
      this.ui.updateAll(this.state);

      // Мгновенное перемещение
      const newPos = Random.getPosition(this.state.currentPosition, this.fieldSize * this.fieldSize);
      this.placeGoblin(newPos);
      this.resetTimer();
    });
  }

  placeGoblin(position) {
    const holes = this.fieldElement.querySelectorAll(".hole");

    if (this.goblinElement.parentElement) {
      this.goblinElement.remove();
    }

    if (position >= 0 && position < holes.length) {
      holes[position].append(this.goblinElement);
      this.state.currentPosition = position;
    }
  }

  moveGoblin() {
    if (!this.state.isRunning || this.gameOverScreen.isVisible()) {
      return;
    }

    // Пропуск
    this.state.addMiss();
    this.ui.updateAll(this.state);

    // Проверка Game Over
    if (this.state.isGameOver()) {
      this.gameOverScreen.show(this.state.getScore());
      this.stop();
      return;
    }

    const newPos = Random.getPosition(this.state.currentPosition, this.fieldSize * this.fieldSize);
    this.placeGoblin(newPos);
  }

  resetTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    if (this.state.isRunning) {
      this.intervalId = setInterval(() => {
        this.moveGoblin();
      }, this.moveDelay);
    }
  }

  start() {
    if (this.state.isRunning) {
      return;
    }

    this.gameOverScreen.hide();

    this.state.isRunning = true;
    this.state.reset();
    this.ui.updateAll(this.state);

    const startPos = Random.getPosition(-1, this.fieldSize * this.fieldSize);
    this.placeGoblin(startPos);

    this.intervalId = setInterval(() => {
      this.moveGoblin();
    }, this.moveDelay);

  }

  stop() {
    this.state.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.ui.updateAll(this.state);
  }

  reset() {
    this.stop();
    this.gameOverScreen.hide();
    this.state.reset();
    this.state.isRunning = false;
    
    if (this.goblinElement.parentElement) {
      this.goblinElement.remove();
    }
    
    this.ui.updateAll(this.state);
  }
}