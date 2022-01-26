import TextureKeys from '../constants/TextureKeys';
import StateKeys from '../constants/StateKeys';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  /**
   * Velocity for running
   */
  private runVelocity: number = 350;

  /**
   * Velocity for jumps
   */
  private jumpVelocity = {
    singleJump: -500,
    doubleJump: -350,
  };

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.createAnimations();
    this.run();
    this.addEventHandler();
  }

  addEventHandler() {
    this.on(
      'animationcomplete',
      (animation) => {
        switch (animation.key) {
          case StateKeys.SINGLE_JUMP:
            this.state = StateKeys.FALL;
            break;
          case StateKeys.DOUBLE_JUMP:
            this.state = StateKeys.FALL;
            break;
        }
      },
      this,
    );
    this.scene.physics.world.on('worldbounds', (body, up, down) => {
      if (down) {
        this.die();
      }
    });
  }

  createAnimations() {
    this.anims.create({
      key: StateKeys.RUN,
      frames: this.anims.generateFrameNumbers(TextureKeys.CAT, {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1, // -1: infinity
    });
    this.anims.create({
      key: StateKeys.SINGLE_JUMP,
      frames: this.anims.generateFrameNumbers(TextureKeys.CAT, {
        start: 5,
        end: 5,
      }),
      frameRate: 5,
      repeat: 1,
    });
    this.anims.create({
      key: StateKeys.DOUBLE_JUMP,
      frames: this.anims.generateFrameNumbers(TextureKeys.CAT, {
        start: 5,
        end: 5,
      }),
      frameRate: 5,
      repeat: 1,
    });
    this.anims.create({
      key: StateKeys.DIE,
      frames: this.anims.generateFrameNumbers(TextureKeys.CAT, {
        start: 5,
        end: 5,
      }),
      frameRate: 5,
      repeat: 1,
    });
  }

  jump() {
    switch (this.state) {
      case StateKeys.DOUBLE_JUMP:
        // do nothing
        return;
      case StateKeys.SINGLE_JUMP:
        //do double jump
        this.state = StateKeys.DOUBLE_JUMP;
        this.play(StateKeys.SINGLE_JUMP);
        this.setVelocityY(this.jumpVelocity.doubleJump);
        break;
      default:
        //do single jump
        this.state = StateKeys.SINGLE_JUMP;
        this.play(StateKeys.SINGLE_JUMP);
        this.setVelocityY(this.jumpVelocity.singleJump);
        break;
    }
  }

  run() {
    if (this.state === StateKeys.RUN) return;
    this.state = StateKeys.RUN;
    this.play(StateKeys.RUN);
    this.setVelocityX(this.runVelocity);
  }

  die() {
    if (this.state === StateKeys.DIE) return;
    this.state = StateKeys.DIE;
  }
}
