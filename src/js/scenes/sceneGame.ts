import Phaser from 'phaser';
import SceneKeys from '../constants/SceneKeys';
import TextureKeys from '../constants/TextureKeys';
import Player from '../objects/player';
import Platforms from '../objects/platforms';

export default class SceneGame extends Phaser.Scene {
  private platforms?: Platforms;
  private player?: Player;

  private score = 0;
  private scoreText: Phaser.GameObjects.Text;
  private keySpace: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;

  constructor() {
    super({
      key: SceneKeys.GAME,
    });
  }

  //////////////////////////////////////////////////
  // LIFECYCLE (init, preload, create, update)    //
  //////////////////////////////////////////////////

  init(): void {}

  preload(): void {
    this.load.image(TextureKeys.BACKGROUND, 'assets/img/background.jpg');
    this.load.image(
      TextureKeys.PLATFORM_STRAIGHT,
      'assets/img/platform_straight.png',
    );
    this.load.spritesheet(TextureKeys.CAT, 'assets/img/cat.png', {
      frameWidth: 360,
      frameHeight: 200,
    });
  }

  create(): void {
    // store the width and height of the game screen
    const width = this.scale.width;
    const height = this.scale.height;
    // add background
    this.add
      .image(0, 0, TextureKeys.BACKGROUND)
      .setOrigin(0, 0)
      .setScrollFactor(0, 0);
    // create platforms
    this.platforms = new Platforms(this.physics.world, this);
    // create player
    this.player = new Player(this, 80, 250, TextureKeys.CAT).setScale(0.3);
    // add collision
    this.physics.add.collider(this.player, this.platforms);
    // make camera follow the cat
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height);
    // get keys
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    // text
    this.scoreText = this.add.text(0, 5, `${this.score}`, {
      fontFamily: 'sans-serif',
    });
  }

  update(): void {
    if (this.keySpace.isDown) {
      this.player.jump();
    }
    if (this.keyD.isDown) {
      console.log('Dash');
    }
    this.platforms.spawnPlatform();
    // update score
    this._updateScore();
  }

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////

  _updateScore() {
    this.score++;
    this.scoreText.setText(`${this.score}`);
    this.scoreText.x = this.player.x;
  }
}
