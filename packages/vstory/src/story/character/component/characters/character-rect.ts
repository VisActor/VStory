import type { Graphic } from '../graphic/graphic';
import { GraphicRect } from '../graphic/rect';
import { CharacterComponent } from '../character';
import { StoryGraphicType } from '../../../../dsl/constant';

export class CharacterComponentRect extends CharacterComponent {
  readonly graphicType: string = 'rect';
  protected _createGraphic(): Graphic {
    return new GraphicRect(StoryGraphicType.RECT, this);
  }

  setAttributes(attr: Record<string, any>): void {
    this.group.setAttributes(attr);
    this._graphic.setAttributes({ ...attr, x: 0, y: 0, angle: 0 });
    this._text.updateAttribute({});
  }
}
