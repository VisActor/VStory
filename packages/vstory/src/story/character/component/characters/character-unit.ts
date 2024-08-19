import type { Graphic } from '../graphic/graphic';
import { CharacterComponent } from '../character';
import { StoryComponentType } from '../../../../constants/character';
import { GraphicUnit } from '../graphic/unit';

export class CharacterComponentUnit extends CharacterComponent {
  readonly graphicType: string = 'unit';
  protected _createGraphic(): Graphic {
    return new GraphicUnit(StoryComponentType.UNIT, this);
  }
}
