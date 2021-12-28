import TextureKeys from '../constants/TextureKeys';

export default class Platforms extends Phaser.Physics.Arcade.StaticGroup {
  constructor(
    world: Phaser.Physics.Arcade.World,
    scene: Phaser.Scene,
    children?:
      | Phaser.GameObjects.GameObject[]
      | Phaser.Types.GameObjects.Group.GroupConfig
      | Phaser.Types.GameObjects.Group.GroupCreateConfig,
    config?:
      | Phaser.Types.GameObjects.Group.GroupConfig
      | Phaser.Types.GameObjects.Group.GroupCreateConfig,
  ) {
    super(world, scene, children, config);
    scene.add.existing(this);

    // Create first platform where the player starts
    this.create(180, 300, TextureKeys.PLATFORM_STRAIGHT).setScale(2.5);
  }

  spawnPlatform() {
    // Spawn one new plaform, outside of the camera
    const lastPlatform = this.getChildren()[
      this.getChildren().length - 1
    ] as Phaser.GameObjects.Sprite;
    const camRightX = this.scene.scale.width + this.scene.cameras.main.scrollX;
    if (lastPlatform.x > camRightX) return;

    const spawnX = lastPlatform.getRightCenter().x + 300;
    const spawnY = 300;
    this.create(spawnX, spawnY, TextureKeys.PLATFORM_STRAIGHT).setScale(2.5);
  }
}
