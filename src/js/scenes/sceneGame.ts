import Phaser from 'phaser'
import Textures from '../constants/Textures'
import States from '../constants/States'

export default class SceneGame extends Phaser.Scene {
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
    this.load.image(Textures.background, 'assets/img/background.jpg');
    this.load.image(Textures.platformStraight, 'assets/img/platform_straight.png');
    this.load.spritesheet('cat_walking',
      'assets/img/cat_walking.png',
      { frameWidth: 360, frameHeight: 300 }
    );
  }

  create(): void {
    // store the width and height of the game screen
    // const width = this.scale.width;
    const height = this.scale.height;
    this.add.image(0, 0, Textures.background).setOrigin(0, 0);

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(180, 300, Textures.platformStraight);

    this.cat.run = this.physics.add.sprite(80, 250, 'cat_walking').setScale(0.2);
    this.cat.run.setCollideWorldBounds(true);
    this.createAnimationsCat();
    this.cat.run.play("run");
    this.cat.run.setVelocityX(this.cat.velocity);

    // add collision
    this.physics.add.collider(this.cat.run, this.platforms);

    // make camera follow the cat
    this.cameras.main.startFollow(this.cat.run);
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height);
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
