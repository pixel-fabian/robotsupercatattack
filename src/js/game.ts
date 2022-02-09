import Phaser from 'phaser';
import SceneLoad from './scenes/sceneLoad';
import SceneMenu from './scenes/sceneMenu';
import SceneGame from './scenes/sceneGame';
import SceneHighscore from './scenes/sceneHighscore';
import SceneCredits from './scenes/sceneCredits';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO, // WebGL if available
  title: 'Blueprint',
  width: 800,
  height: 533,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 700 },
    },
  },
  pixelArt: true,
  scene: [SceneLoad, SceneMenu, SceneGame, SceneHighscore, SceneCredits],
};

window.onload = () => {
  new Phaser.Game(config);
};
