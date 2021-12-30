import Phaser from 'phaser';
import SceneKeys from '../constants/SceneKeys';

export default class SceneMenu extends Phaser.Scene {
  constructor() {
    super({
      key: SceneKeys.MENU,
    });
  }

  //////////////////////////////////////////////////
  // LIFECYCLE (init, preload, create, update)    //
  //////////////////////////////////////////////////

  init(): void {}

  preload(): void {}

  create(): void {
    const buttonPlay = this.add.text(350, 200, '< Play >', {
      fontFamily: 'BitPotion',
      color: '#fff',
      fontSize: '35px',
    });
    buttonPlay.setInteractive();
    buttonPlay.on('pointerdown', () => {
      console.log('Play');
      this.scene.start(SceneKeys.GAME);
    });

    const buttonHighscore = this.add.text(325, 250, '< Highscore >', {
      fontFamily: 'BitPotion',
      color: '#fff',
      fontSize: '35px',
    });
    buttonHighscore.setInteractive();
    buttonHighscore.on('pointerdown', () => {
      console.log('Highscore');
      this.scene.start(SceneKeys.HIGHSCORE);
    });
  }

  update(): void {}

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////
}
