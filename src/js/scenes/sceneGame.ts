import Phaser from 'phaser'

export default class SceneGame extends Phaser.Scene {
  static stateJump = 'jump';
  static stateRun = 'run';
  static stateDie = 'die';

  private platforms?: Phaser.Physics.Arcade.StaticGroup;
  private cat?: {
    'run': Phaser.Physics.Arcade.Sprite,
    'jump': Phaser.Physics.Arcade.Sprite,
    'die': Phaser.Physics.Arcade.Sprite,
    'velocity': number,
  } = {
      'run': null,
      'jump': null,
      'die': null,
      'velocity': 200
    }

  constructor() {
    super({
      key: 'SceneGame',
    });
  }

  //////////////////////////////////////////////////
  // LIFECYCLE (init, preload, create, update)    //
  //////////////////////////////////////////////////

  init(): void { }

  preload(): void {
    this.load.image('background', 'assets/img/background.jpg');
    this.load.image('platform_straight', 'assets/img/platform_straight.png');
    this.load.spritesheet('cat_walking',
      'assets/img/cat_walking.png',
      { frameWidth: 360, frameHeight: 300 }
    );
  }

  create(): void {
    this.add.image(0, 0, 'background').setOrigin(0, 0);

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(180, 300, 'platform_straight');

    this.cat.run = this.physics.add.sprite(80, 250, 'cat_walking').setScale(0.2);
    this.cat.run.setBounce(0.1);
    this.cat.run.setCollideWorldBounds(true);
    this.createAnimationsCat();
    this.cat.run.play("run");
    this.cat.run.setVelocityX(this.cat.velocity);

    // add collision
    this.physics.add.collider(this.cat.run, this.platforms);
  }

  update(): void {

  }

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////

  private createAnimationsCat() {
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('cat_walking', {
        start: 0, end: 4
      }),
      frameRate: 5,
      repeat: -1 // -1: infinity
    });
  }

}
