import 'phaser';
import SCENES from '../constants/SceneKeys';
import TEXTURES from '../constants/TextureKeys';
import AUDIO from '../constants/AudioKeys';

export default class SceneLoad extends Phaser.Scene {
  constructor() {
    super({
      key: SCENES.CREDITS,
    });
  }

  //////////////////////////////////////////////////
  // LIFECYCLE (init, preload, create, update)    //
  //////////////////////////////////////////////////

  init(): void {}

  preload(): void {}

  create(): void {
    this.add.image(0, 0, TEXTURES.BACKGROUND_MENU).setOrigin(0, 0);
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
    //text
    this.add.text(50, 330, 'A game by: pixel-fabian', {
      fontFamily: 'BitPotion',
      color: '#fff',
      fontSize: '35px',
    });
    this.add.text(50, 360, 'Game engine: Phaser 3 by PhotonStorm', {
      fontFamily: 'BitPotion',
      color: '#fff',
      fontSize: '35px',
    });
    this.add.text(50, 390, 'Music: Space Cats - Magic Fly by Enjoyker', {
      fontFamily: 'BitPotion',
      color: '#fff',
      fontSize: '35px',
    });
    this.add.text(50, 420, 'Font: BitPotion by Joeb Rogers (CC-BY)', {
      fontFamily: 'BitPotion',
      color: '#fff',
      fontSize: '35px',
    });
  }

  update(): void {}

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////
}
