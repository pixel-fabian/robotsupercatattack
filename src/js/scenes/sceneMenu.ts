import Phaser from 'phaser'

export default class SceneMenu extends Phaser.Scene {

  constructor() {
    super({
      key: 'SceneMenu',
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
