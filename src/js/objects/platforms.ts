import TEXTURES from '../constants/TEXTURES';

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
    const newPlatform = this.create(180, 400, TEXTURES.PLATFORM_01);
    newPlatform.body.setSize(700, 250);
  }

  spawnPlatform() {
    // Spawn one new plaform, outside of the camera
    const lastPlatform = this.getChildren()[
      this.getChildren().length - 1
    ] as Phaser.GameObjects.Sprite;
    const camRightX = this.scene.scale.width + this.scene.cameras.main.scrollX;
    if (lastPlatform.x > camRightX) return;

    const spawnX = lastPlatform.getRightCenter().x + 600;
    const spawnY = 400;
    const newPlatform = this.create(spawnX, spawnY, TEXTURES.PLATFORM_01);
    newPlatform.body.setSize(700, 250);
  }
}
