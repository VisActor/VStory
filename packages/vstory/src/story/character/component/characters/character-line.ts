import type { Graphic } from '../graphic/graphic';
import { GraphicLine } from '../graphic/line';
import { CharacterComponent } from '../character';
import { StoryComponentType } from '../../../../constants/character';

export class CharacterComponentLine extends CharacterComponent {
  readonly graphicType: string = 'line';
  protected _createGraphic(): Graphic {
    return new GraphicLine(StoryComponentType.RECT, this);
  }
}
