import Phaser from 'phaser';
import SCENES from '../constants/SCENES';

export default class SceneMenu extends Phaser.Scene {
  constructor() {
    super({
      key: SCENES.MENU,
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
      this.scene.start(SCENES.GAME);
    });

    const buttonHighscore = this.add.text(325, 250, '< Highscore >', {
      fontFamily: 'BitPotion',
      color: '#fff',
      fontSize: '35px',
    });
    buttonHighscore.setInteractive();
    buttonHighscore.on('pointerdown', () => {
      console.log('Highscore');
      this.scene.start(SCENES.HIGHSCORE);
    });
  }

  update(): void {}

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////
}
