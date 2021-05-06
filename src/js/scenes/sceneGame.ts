import Phaser from 'phaser'

export default class SceneGame extends Phaser.Scene {
  private platforms?: Phaser.Physics.Arcade.StaticGroup;
  private player?: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super({
      key: 'SceneGame',
    });
  }

  //////////////////////////////////////////////////
  // LIFECYCLE (init, preload, create, update)    //
  //////////////////////////////////////////////////

  init(): void {
    console.log('init()');
  }

  preload(): void {
    this.load.image('platform_straight', 'assets/img/platform_straight.png');
  }

  create(): void {
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(300, 300, 'platform_straight');
  }

  update(): void { }

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////
}
