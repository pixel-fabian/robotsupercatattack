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

  preload(): void { }

  create(): void {
    this.add.text(350, 260, 'Hello World', { fontFamily: 'sans-serif', color: '#fff' });
  }

  update(): void { }

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////
}
