import Phaser from 'phaser';
import SceneKeys from '../constants/SceneKeys';
import TextureKeys from '../constants/TextureKeys';
import StateKeys from '../constants/StateKeys';

export default class SceneGame extends Phaser.Scene {
  private platforms?: Phaser.Physics.Arcade.StaticGroup;
  private cat?: {
    sprite: Phaser.Physics.Arcade.Sprite;
    velocityRun: number;
    velocityJump: number;
  } = {
    sprite: null,
    velocityRun: 200,
    velocityJump: -400,
  };
  private state: String;
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
    this.load.image(TextureKeys.background, 'assets/img/background.jpg');
    this.load.image(
      TextureKeys.platformStraight,
      'assets/img/platform_straight.png',
    );
    this.load.spritesheet(TextureKeys.cat, 'assets/img/cat.png', {
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
      .image(0, 0, TextureKeys.background)
      .setOrigin(0, 0)
      .setScrollFactor(0, 0);
    // create platforms
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(180, 300, TextureKeys.platformStraight);
    this.platforms.create(680, 300, TextureKeys.platformStraight);
    // create cat
    this.cat.sprite = this.physics.add
      .sprite(80, 250, TextureKeys.cat)
      .setScale(0.3);
    this.createAnimationsCat();
    this.cat.sprite.play('run');
    this.cat.sprite.setVelocityX(this.cat.velocityRun);
    // add collision
    this.physics.add.collider(this.cat.sprite, this.platforms);
    // make camera follow the cat
    this.cameras.main.startFollow(this.cat.sprite);
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height);
    // get keys
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    // set state
    this.state = StateKeys.run;
    // EventHandler
    this.cat.sprite.on(
      'animationcomplete',
      (animation) => {
        if (animation.key === StateKeys.jump) {
          // Back to running
          this.state = StateKeys.run;
          this.cat.sprite.play(StateKeys.run);
        }
      },
      this,
    );
    // text
    this.scoreText = this.add.text(0, 5, `${this.score}`, {
      fontFamily: 'sans-serif',
    });
  }

  update(): void {
    if (this.keySpace.isDown) {
      this.jump();
    }
    if (this.keyD.isDown) {
      console.log('Dash');
    }
    this.spawnPlatform();
    // update score
    this.score++;
    this.scoreText.setText(`${this.score}`);
    this.scoreText.x = this.cat.sprite.x;
  }

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////

  private createAnimationsCat() {
    this.anims.create({
      key: StateKeys.run,
      frames: this.anims.generateFrameNumbers(TextureKeys.cat, {
        start: 0,
        end: 4,
      }),
      frameRate: 5,
      repeat: -1, // -1: infinity
    });
    this.anims.create({
      key: StateKeys.jump,
      frames: this.anims.generateFrameNumbers(TextureKeys.cat, {
        start: 5,
        end: 5,
      }),
      frameRate: 5,
      repeat: 1,
    });
  }

  private jump() {
    if (this.state === StateKeys.jump) return;
    this.state = StateKeys.jump;
    this.cat.sprite.play(StateKeys.jump);
    this.cat.sprite.setVelocityY(this.cat.velocityJump);
  }

  private spawnPlatform() {
    //this.platforms.create(180, 300, TextureKeys.platformStraight);
  }
}
