import type { IComponentCharacterRuntime } from '../interface/runtime';
import { BaseRuntime } from './base';

export class LineRuntime extends BaseRuntime implements IComponentCharacterRuntime {
  type = 'Line';
  applyConfigToAttribute(): void {
    super.applyConfigToAttribute();
    const rawAttribute = this._character.getAttribute();
    const { width = 1, height = 1 } = rawAttribute;
    rawAttribute.graphic.points = [
      { x: 0, y: 0 },
      { x: width, y: height }
    ];
  }
}
