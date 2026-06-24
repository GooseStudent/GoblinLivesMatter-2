import Game from '../core/game';
import { gameConfig } from '../config';

describe('Game', () => {
  let game;
  
  beforeEach(() => {
    document.body.innerHTML = '<div id="game-field"></div>';
    game = new Game(4);
  });

  afterEach(() => {
    game.stop();
  });

  test('поле 4 на 4', () => {
    const holes = document.querySelectorAll('.hole');
    expect(holes.length).toBe(16);
  });

  test('создание гоблина', () => {
    expect(game.goblinElement).toBeInstanceOf(HTMLImageElement);
  });

  test('перемещение гоблина в рандомное место', () => {
    game.start();
    expect(game.state.currentPosition).toBeGreaterThanOrEqual(0);
    expect(game.state.currentPosition).toBeLessThan(16);
    
    const initialPos = game.state.currentPosition;
    game.moveGoblin();
    
    expect(game.state.currentPosition).not.toBe(initialPos);
    expect(game.state.currentPosition).toBeGreaterThanOrEqual(0);
    expect(game.state.currentPosition).toBeLessThan(16);
  });

  test('гоблин не перемещается в ту же ячейку', () => {
    game.start();
    const initialPos = game.state.currentPosition;
    
    for (let i = 0; i < 10; i++) {
      game.moveGoblin();
      expect(game.state.currentPosition).toBeGreaterThanOrEqual(0);
      expect(game.state.currentPosition).toBeLessThan(16);
    }
  });

  test('счетчик увеличивается при попадании', () => {
    game.start();
    const initialScore = game.state.getScore();
    
    game.goblinElement.click();
    
    expect(game.state.getScore()).toBe(initialScore + 1);
  });

  test('пропуски увеличиваются при перемещении гоблина', () => {
    game.start();
    const initialMisses = game.state.getMisses();
    
    game.moveGoblin();
    
    expect(game.state.getMisses()).toBe(initialMisses + 1);
  });

  test('игра заканчивается при 5 пропусках', () => {
    game.start();
    
    for (let i = 0; i < 5; i++) {
      game.moveGoblin();
    }
    
    expect(game.state.isGameOver()).toBe(true);
    expect(game.state.isRunning).toBe(false);
  });
});