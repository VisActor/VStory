import type { Graphic } from '../graphic/graphic';
import { CharacterComponent } from '../character';
import { StoryComponentType } from '../../../../constants/character';
import { GraphicSymbol } from '../graphic/symbol';
import type { StoryEvent } from '../../../interface';
import type { ICharacterPickInfo } from '../../runtime-interface';

export class CharacterComponentShape extends CharacterComponent {
  readonly graphicType: string = 'shape';
  protected _createGraphic(): Graphic {
    return new GraphicSymbol(StoryComponentType.SHAPE, this);
  }

  setAttributes(attr: Record<string, any>): void {
    this.group.setAttributes({
      ...attr,
      x: attr.x - attr.width / 2,
      y: attr.y - attr.height / 2
    });
    this._graphic.setAttributes({
      ...attr,
      x: attr.width / 2,
      y: attr.height / 2,
      angle: 0,
      size: Math.min(attr.width, attr.height)
    });
    this._text.updateAttribute({});
  }

  checkEvent(event: StoryEvent): false | ICharacterPickInfo {
    const info = super.checkEvent(event);
    if (info && event.path[event.path.length - 1] === this._group) {
      return false;
    }
    return info;
  }
}
