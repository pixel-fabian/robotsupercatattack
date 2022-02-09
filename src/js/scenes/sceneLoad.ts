import 'phaser';
import SCENES from '../constants/SceneKeys';
import TEXTURES from '../constants/TextureKeys';
import AUDIO from '../constants/AudioKeys';

export default class SceneLoad extends Phaser.Scene {
  constructor() {
    super({
      key: SCENES.LOAD,
    });
  }

  //////////////////////////////////////////////////
  // LIFECYCLE (init, preload, create, update)    //
  //////////////////////////////////////////////////

  init(): void {}

  preload(): void {
    // add text
    this.add.text(360, 225, 'Loading...', {
      fontFamily: 'sans-serif',
      color: '#fff',
    });
    // create loading bar
    const loadingBar = this._createLoadingBar();
    this.load.on('progress', (nPercentage) => {
      loadingBar.fillRect(255, 255, 290 * nPercentage, 20);
    });

    // load all textures
    this.load.image(TEXTURES.BACKGROUND_MENU, 'assets/img/background01.jpg');
    this.load.image(TEXTURES.BACKGROUND_BG, 'assets/img/clouds_bg.png');
    this.load.image(TEXTURES.BACKGROUND_MG, 'assets/img/clouds_mg.png');
    this.load.image(TEXTURES.BACKGROUND_FG, 'assets/img/clouds_fg.png');
    this.load.image(TEXTURES.PLATFORM_01, 'assets/img/platform_01.png');
    this.load.spritesheet(TEXTURES.CAT, 'assets/img/robocat_sprite.png', {
      frameWidth: 100,
      frameHeight: 64,
    });
    this.load.spritesheet(
      TEXTURES.BUTTON_PLAY,
      'assets/img/button_02_play.png',
      {
        frameWidth: 120,
        frameHeight: 32,
      },
    );
    this.load.spritesheet(
      TEXTURES.BUTTON_HIGHSCORE,
      'assets/img/button_02_highscore.png',
      {
        frameWidth: 120,
        frameHeight: 32,
      },
    );
    this.load.spritesheet(
      TEXTURES.BUTTON_CREDITS,
      'assets/img/button_02_credits.png',
      {
        frameWidth: 120,
        frameHeight: 32,
      },
    );

    // load all audio
    this.load.audio(AUDIO.MUSIC_MENU, [
      'assets/audio/space_cats_magic_fly_intro.mp3',
    ]);
    this.load.audio(AUDIO.MUSIC_GAME, [
      'assets/audio/space_cats_magic_fly_endless.mp3',
    ]);
    this.load.audio(AUDIO.JUMP, ['assets/audio/jump.wav']);
  }

  create(): void {
    this.scene.start(SCENES.MENU);
  }

  update(): void {}

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////

  _createLoadingBar() {
    const loadingBg = this.add.graphics({
      fillStyle: {
        color: 0x222222,
      },
    });
    loadingBg.fillRect(250, 250, 300, 30);
    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xcccccc,
      },
    });
    return loadingBar;
  }
}
