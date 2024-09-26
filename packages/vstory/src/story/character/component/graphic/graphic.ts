import type { CharacterComponent } from '../character';
import { BaseGraphic } from '../../base/graphic';

export interface IGraphicConstructor {
  new (type: string, character: CharacterComponent): Graphic;
}

export abstract class Graphic extends BaseGraphic {
  getTextLayoutRatio(): { left: number; right: number; top: number; bottom: number } {
    return {
      left: 0,
      right: 1,
      top: 0,
      bottom: 1
    };
  }
}
