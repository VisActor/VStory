import type { ICharacterComponent } from '../interface/character-component';
import type { IComponentCharacterRuntime } from '../interface/runtime';

export class LineRuntime implements IComponentCharacterRuntime {
  type = 'Line';
  applyConfigToAttribute(character: ICharacterComponent): void {
    const rawAttribute = character.getAttribute();
    const { width = 1, height = 1 } = rawAttribute;
    rawAttribute.graphic.points = rawAttribute.graphic.points ?? [
      { x: 0, y: 0 },
      { x: width, y: height }
    ];
  }
}

export const LineRuntimeInstance = new LineRuntime();
