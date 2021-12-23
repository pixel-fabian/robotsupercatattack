import Phaser from 'phaser'
import SceneMenu from './scenes/sceneMenu';
import SceneGame from './scenes/sceneGame';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO, // WebGL if available
  title: 'Blueprint',
  width: 800,
  height: 533,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 }
    }
  },
  scene: [SceneGame],
};

window.onload = () => {
  // eslint-disable-next-line no-unused-vars
  const game = new Phaser.Game(config);
};
