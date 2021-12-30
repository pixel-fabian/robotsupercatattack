import 'phaser';
import SceneKeys from '../constants/SceneKeys';
export default class SceneLoad extends Phaser.Scene {
  constructor() {
    super({
      key: SceneKeys.LOAD,
    });
  }

  //////////////////////////////////////////////////
  // LIFECYCLE (init, preload, create, update)    //
  //////////////////////////////////////////////////

  init(): void {}

  preload(): void {}

  create(): void {
    this.add.text(350, 300, 'Loading', {
      fontFamily: 'sans-serif',
      color: '#fff',
    });
    this.scene.start(SceneKeys.MENU);
  }

  update(): void {}

  //////////////////////////////////////////////////
  // Private methods                              //
  //////////////////////////////////////////////////
}
