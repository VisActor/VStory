import type { Graphic } from '../graphic/graphic';
import { GraphicRect } from '../graphic/rect';
import { CharacterComponent } from '../character';
import { StoryComponentType } from '../../../../constants/character';
import type { StoryEvent } from '../../../interface';
import type { ICharacterPickInfo } from '../../runtime-interface';

export class CharacterComponentRect extends CharacterComponent {
  readonly graphicType: string = 'rect';
  protected _createGraphic(): Graphic {
    return new GraphicRect(StoryComponentType.RECT, this);
  }

  checkEvent(event: StoryEvent): false | ICharacterPickInfo {
    const info = super.checkEvent(event);
    if (info && event.path[event.path.length - 1] === this._group) {
      return false;
    }
    return info;
  }
}
