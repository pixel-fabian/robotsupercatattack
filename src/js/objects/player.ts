import TEXTURES from '../constants/TextureKeys';
import STATES from '../constants/StateKeys';

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
          case STATES.SINGLE_JUMP:
            this.state = STATES.FALL;
            break;
          case STATES.DOUBLE_JUMP:
            this.state = STATES.FALL;
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
      key: STATES.RUN,
      frames: this.anims.generateFrameNumbers(TEXTURES.CAT, {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1, // -1: infinity
    });
    this.anims.create({
      key: STATES.SINGLE_JUMP,
      frames: this.anims.generateFrameNumbers(TEXTURES.CAT, {
        start: 5,
        end: 5,
      }),
      frameRate: 5,
      repeat: 1,
    });
    this.anims.create({
      key: STATES.DOUBLE_JUMP,
      frames: this.anims.generateFrameNumbers(TEXTURES.CAT, {
        start: 5,
        end: 5,
      }),
      frameRate: 5,
      repeat: 1,
    });
    this.anims.create({
      key: STATES.DIE,
      frames: this.anims.generateFrameNumbers(TEXTURES.CAT, {
        start: 5,
        end: 5,
      }),
      frameRate: 5,
      repeat: 1,
    });
  }

  jump() {
    switch (this.state) {
      case STATES.DOUBLE_JUMP:
        // do nothing
        return;
      case STATES.SINGLE_JUMP:
        //do double jump
        this.state = STATES.DOUBLE_JUMP;
        this.play(STATES.SINGLE_JUMP);
        this.setVelocityY(this.jumpVelocity.doubleJump);
        break;
      default:
        //do single jump
        this.state = STATES.SINGLE_JUMP;
        this.play(STATES.SINGLE_JUMP);
        this.setVelocityY(this.jumpVelocity.singleJump);
        break;
    }
  }

  run() {
    if (this.state === STATES.RUN) return;
    this.state = STATES.RUN;
    this.play(STATES.RUN);
    this.setVelocityX(this.runVelocity);
  }

  die() {
    if (this.state === STATES.DIE) return;
    this.state = STATES.DIE;
  }
}
