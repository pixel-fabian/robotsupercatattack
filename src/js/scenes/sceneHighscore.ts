import 'phaser';
import SCENES from '../constants/SceneKeys';
import TEXTURES from '../constants/TextureKeys';
import AUDIO from '../constants/AudioKeys';

export default class SceneLoad extends Phaser.Scene {
  constructor() {
    super({
      key: SCENES.HIGHSCORE,
    });
  }

  //////////////////////////////////////////////////
  // LIFECYCLE (init, preload, create, update)    //
  //////////////////////////////////////////////////

  init(): void {}

  preload(): void {}

  create(): void {
    // buttons
    const buttonPlay = this.add.text(50, 50, '< back', {
      fontFamily: 'BitPotion',
      color: '#fff',
      fontSize: '35px',
    });
    buttonPlay.setInteractive();
    buttonPlay.on('pointerdown', () => {
      this.scene.start(SCENES.MENU);
    });
  }

  update(): void {}

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////
}
