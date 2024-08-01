import type { Graphic } from '../graphic/graphic';
import { CharacterComponent } from '../character';
import { StoryGraphicType } from '../../../../constants/character';
import { GraphicSymbol } from '../graphic/symbol';

export class CharacterComponentShape extends CharacterComponent {
  readonly graphicType: string = 'shape';
  protected _createGraphic(): Graphic {
    return new GraphicSymbol(StoryGraphicType.SHAPE, this);
  }
}
