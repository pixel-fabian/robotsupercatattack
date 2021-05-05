import 'phaser';
import { SceneGame } from './scenes/SceneGame';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO, // WebGL if available
  title: 'Blueprint',
  width: 800,
  height: 600,
  parent: 'game',
  scene: [SceneGame],
};

window.onload = () => {
  // eslint-disable-next-line no-unused-vars
  const game = new Phaser.Game(config);
};
