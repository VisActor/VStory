import type { Graphic } from '../graphic/graphic';
import { GraphicLine } from '../graphic/line';
import { CharacterComponent } from '../character';
import { StoryGraphicType } from '../../../../dsl/constant';

export class CharacterComponentLine extends CharacterComponent {
  readonly graphicType: string = 'line';
  protected _createGraphic(): Graphic {
    return new GraphicLine(StoryGraphicType.RECT, this);
  }
}
