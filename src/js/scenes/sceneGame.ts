import Phaser from 'phaser'

export default class SceneGame extends Phaser.Scene {
  private platforms?: Phaser.Physics.Arcade.StaticGroup;
  private cat?: Phaser.Physics.Arcade.Sprite;

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
      { frameWidth: 360, frameHeight: 360 }
    );
  }

  create(): void {
    this.add.image(0, 0, 'background').setOrigin(0, 0);

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(300, 300, 'platform_straight');

    this.cat = this.physics.add.sprite(150, 250, 'cat_walking').setScale(0.2, 0.2);
    this.cat.setBounce(0.1);
    this.cat.setCollideWorldBounds(true);
    this.createAnimationsCat();
    this.cat.play("walk");

    // add collision
    this.physics.add.collider(this.cat, this.platforms);
  }

  update(): void { }

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////

  private createAnimationsCat() {
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('cat_walking', {
        start: 0, end: 4
      }),
      frameRate: 10,
      repeat: -1 // -1: infinity
    });
  }
}
