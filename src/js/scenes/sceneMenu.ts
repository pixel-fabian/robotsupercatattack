import Phaser from 'phaser';
import SCENES from '../constants/SceneKeys';
import TEXTURES from '../constants/TextureKeys';
import AUDIO from '../constants/AudioKeys';

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
    this.add.image(0, 0, TEXTURES.BACKGROUND_MENU).setOrigin(0, 0);
    // sounds
    const music = this.sound.add(AUDIO.MUSIC_MENU, { loop: true });
    music.play();
    // buttons
    const buttonPlay = this.add.text(350, 200, '< Play >', {
      fontFamily: 'BitPotion',
      color: '#fff',
      fontSize: '35px',
    });
    buttonPlay.setInteractive();
    buttonPlay.on('pointerdown', () => {
      console.log('Play');
      music.stop();
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

    const buttonCredits = this.add.text(335, 300, '< Credits >', {
      fontFamily: 'BitPotion',
      color: '#fff',
      fontSize: '35px',
    });
    buttonCredits.setInteractive();
    buttonCredits.on('pointerdown', () => {
      this.scene.start(SCENES.CREDITS);
    });
  }

  update(): void {}

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////
}
