import 'phaser';
export class SceneGame extends Phaser.Scene {
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
    this.add.text(350, 300, 'Hello World', { fontFamily: 'sans-serif', color: '#fff' });
  }

  update(): void { }

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////
}
