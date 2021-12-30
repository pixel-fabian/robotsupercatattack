import Phaser from 'phaser';
import SceneKeys from '../constants/SceneKeys';
import TextureKeys from '../constants/TextureKeys';
import Player from '../objects/player';
import Platforms from '../objects/platforms';

export default class SceneGame extends Phaser.Scene {
  private platforms?: Platforms;
  private player?: Player;
  private background_bg?: Phaser.GameObjects.TileSprite;
  private background_mg?: Phaser.GameObjects.TileSprite;
  private background_fg?: Phaser.GameObjects.TileSprite;

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
    this.load.image(TextureKeys.BACKGROUND_BG, 'assets/img/clouds_bg.png');
    this.load.image(TextureKeys.BACKGROUND_MG, 'assets/img/clouds_mg.png');
    this.load.image(TextureKeys.BACKGROUND_FG, 'assets/img/clouds_fg.png');
    this.load.image(
      TextureKeys.PLATFORM_STRAIGHT,
      'assets/img/platform_straight_01.png',
    );
    this.load.spritesheet(TextureKeys.CAT, 'assets/img/robocat_sprite.png', {
      frameWidth: 50,
      frameHeight: 28,
    });
  }

  create(): void {
    // store the width and height of the game screen
    const width = this.scale.width;
    const height = this.scale.height;
    // add background
    this.background_bg = this.add
      .tileSprite(0, 0, 800, 533, TextureKeys.BACKGROUND_BG)
      .setOrigin(0, 0)
      .setScrollFactor(0, 0);
    this.background_mg = this.add
      .tileSprite(0, 0, 800, 533, TextureKeys.BACKGROUND_MG)
      .setOrigin(0, 0)
      .setScrollFactor(0, 0);
    this.background_fg = this.add
      .tileSprite(0, 0, 800, 533, TextureKeys.BACKGROUND_FG)
      .setOrigin(0, 0)
      .setScrollFactor(0, 0);
    // create platforms
    this.platforms = new Platforms(this.physics.world, this);
    // create player
    this.player = new Player(this, 100, 250, TextureKeys.CAT).setScale(2);
    // add collision
    this.physics.add.collider(
      this.player,
      this.platforms,
      this._onCollidePlayerPlatform,
    );
    // make camera follow the cat
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setFollowOffset(-300, 0);
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height);
    // get keys
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    // text
    this.scoreText = this.add.text(0, 5, `${this.score}`, {
      fontFamily: 'BitPotion',
      fontSize: '35px',
    });
  }

  update(): void {
    this.background_bg.tilePositionX += 0.15;
    this.background_mg.tilePositionX += 0.3;
    this.background_fg.tilePositionX += 0.5;
    if (this.keySpace.isDown) {
      this.player.jump();
    }
    if (this.keyD.isDown) {
      console.log('Dash');
    }
    this.platforms.spawnPlatform();
    if (this.player.y >= this.scale.height) {
      this.gameOver();
    }
    // update score
    this._updateScore();
  }

  //////////////////////////////////////////////////
  // Public methods                              //
  //////////////////////////////////////////////////

  gameOver() {
    this.player.die();
    this.scene.pause();
    //this.scene.start(SceneKeys.GAMEOVER);
  }

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////

  _updateScore() {
    this.score++;
    this.scoreText.setText(`${this.score}`);
    this.scoreText.x = this.player.x + 300;
  }

  _onCollidePlayerPlatform(player, platform) {
    player.run();
  }
}
