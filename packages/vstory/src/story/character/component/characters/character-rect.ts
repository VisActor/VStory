import type { Graphic } from '../graphic/graphic';
import { GraphicRect } from '../graphic/rect';
import { CharacterComponent } from '../character';
import { StoryGraphicType } from '../../../../dsl/constant';

export class CharacterComponentRect extends CharacterComponent {
  readonly graphicType: string = 'rect';
  protected _createGraphic(): Graphic {
    return new GraphicRect(StoryGraphicType.RECT, this);
  }
}
