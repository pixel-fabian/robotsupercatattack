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
    this._createMenuButton(400, 270, TEXTURES.BUTTON_PLAY, SCENES.GAME);
    this._createMenuButton(
      400,
      340,
      TEXTURES.BUTTON_HIGHSCORE,
      SCENES.HIGHSCORE,
    );
    this._createMenuButton(400, 410, TEXTURES.BUTTON_CREDITS, SCENES.CREDITS);
  }

  update(): void {}

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////

  /**
   * Create interactive button to start another scene
   * @param nX x coord
   * @param nY y coord
   * @param sTextureKey texture key
   * @param sStartScene scene to start
   * @returns
   */
  _createMenuButton(
    nX: number,
    nY: number,
    sTextureKey: TEXTURES,
    sStartScene: SCENES,
  ) {
    const button = this.add.sprite(nX, nY, sTextureKey, 0);
    button.setScale(1.5);
    const pressAnimKey = `press${sTextureKey}`;
    this.anims.create({
      key: pressAnimKey,
      frames: this.anims.generateFrameNumbers(sTextureKey, {
        start: 0,
        end: 2,
      }),
      frameRate: 12,
      repeat: 0,
    });
    button.setInteractive({ useHandCursor: true });
    button.on('pointerover', () => {
      button.setFrame(3);
    });
    button.on('pointerout', () => {
      button.setFrame(0);
    });
    button.on('pointerdown', () => {
      button.play(pressAnimKey);
    });
    button.on(
      'animationcomplete',
      (animation) => {
        switch (animation.key) {
          case pressAnimKey:
            this.scene.start(sStartScene);
            break;
        }
      },
      this,
    );

    return button;
  }
}
