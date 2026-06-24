import './styles.css';
import Game from './core/game';
import { gameConfig } from './config';

const game = new Game(gameConfig.fieldSize);
game.start();