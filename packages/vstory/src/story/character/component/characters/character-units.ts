import type { Graphic } from '../graphic/graphic';
import { CharacterComponent } from '../character';
import { StoryGraphicType } from '../../../../dsl/constant';
import { GraphicUnits } from '../graphic/units';

export class CharacterComponentUnits extends CharacterComponent {
  readonly graphicType: string = 'units';
  protected _createGraphic(): Graphic {
    return new GraphicUnits(StoryGraphicType.UNITS, this);
  }
}
