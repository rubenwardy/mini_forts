import { EnemyEntityScript } from 'server/entity/enemy_entity/enemy_entity';
import { Entity } from 'server/entity/entity';
import { SlugProperties } from 'server/entity/slug/properties';

export class SlugScript extends EnemyEntityScript<SlugProperties> {
  override update(dt: number): void {
    if (this.collisionInfo.touching_ground) {
      if (this.siege()) return;
      if (this.hunt()) return;
    }
  }

  protected override attackEntity(entity: Entity): void {
    this.animation = this.animations.attack;
    this.restartAnimation();
    entity.damage(2, this);
  }

  protected override attackNode(position: Vector3D) {
    this.animation = this.animations.attack;
    this.restartAnimation();

    const blockRef = this.context.blockManager.getRef(position);
    if (blockRef) {
      blockRef.damage(2, this);
    }
  }
}
