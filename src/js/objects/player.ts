import TextureKeys from '../constants/TextureKeys';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  /**
   * Velocity for running
   */
  private runVelocity: number = 180;

  /**
   * States of the player
   */
  private StateKeys = {
    SINGLE_JUMP: 'singleJump',
    DOUBLE_JUMP: 'doubleJump',
    FALL: 'fall',
    RUN: 'run',
    DIE: 'die',
  };

  /**
   * Velocity for jumps
   */
  private jumpVelocity = {
    singleJump: -400,
    doubleJump: -300,
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
        if (animation.key === this.StateKeys.SINGLE_JUMP) {
          // After JumpState
          this.state = this.StateKeys.FALL;
          //this.play(this.StateKeys.RUN);
        }
      },
      this,
    );
  }

  createAnimations() {
    this.anims.create({
      key: this.StateKeys.RUN,
      frames: this.anims.generateFrameNumbers(TextureKeys.CAT, {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1, // -1: infinity
    });
    this.anims.create({
      key: this.StateKeys.SINGLE_JUMP,
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
      case this.StateKeys.DOUBLE_JUMP:
        // do nothing
        return;
      case this.StateKeys.SINGLE_JUMP:
        //do double jump
        this.state = this.StateKeys.DOUBLE_JUMP;
        this.play(this.StateKeys.SINGLE_JUMP);
        this.setVelocityY(this.jumpVelocity.doubleJump);
        break;
      default:
        //do single jump
        this.state = this.StateKeys.SINGLE_JUMP;
        this.play(this.StateKeys.SINGLE_JUMP);
        this.setVelocityY(this.jumpVelocity.singleJump);
        break;
    }
  }

  run() {
    if (this.state === this.StateKeys.RUN) return;
    this.state = this.StateKeys.RUN;
    this.play(this.StateKeys.RUN);
    this.setVelocityX(this.runVelocity);
  }
}
