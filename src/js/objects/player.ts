import TextureKeys from '../constants/TextureKeys';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  /**
   * Velocity for running
   */
  private runVelocity: number = 150;

  /**
   * States of the player
   */
  private StateKeys = {
    SINGLE_JUMP: 'singleJump',
    DOUBLE_JUMP: 'doubleJump',
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
    this.play(this.StateKeys.RUN);
    this.setVelocityX(this.runVelocity);
    this.addEventHandler();
  }

  addEventHandler() {
    this.on(
      'animationcomplete',
      (animation) => {
        if (animation.key === this.StateKeys.SINGLE_JUMP) {
          // Back to running
          this.state = this.StateKeys.RUN;
          this.play(this.StateKeys.RUN);
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
        end: 4,
      }),
      frameRate: 5,
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
    if (this.state === this.StateKeys.SINGLE_JUMP) return;
    this.state = this.StateKeys.SINGLE_JUMP;
    this.play(this.StateKeys.SINGLE_JUMP);
    this.setVelocityY(this.jumpVelocity.singleJump);
  }
}
