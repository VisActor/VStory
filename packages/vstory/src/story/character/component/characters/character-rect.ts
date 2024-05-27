import { Graphic } from '../graphic/graphic';
import { GraphicRect } from '../graphic/rect';
import { CharacterComponent } from '../character';
import { StoryGraphicType } from '../../../../dsl/constant';

export class CharacterComponentRect extends CharacterComponent {
  protected _createGraphic(): Graphic {
    return new GraphicRect(StoryGraphicType.RECT, this);
  }
}
