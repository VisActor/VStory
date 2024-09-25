import type { Graphic } from '../graphic/graphic';
import { GraphicText } from '../graphic/text';
import { CharacterComponent } from '../character';
import { StoryComponentType } from '../../../../constants/character';

/**
 * text component 没有关联 graphic，逻辑与 GraphicText 有所不同
 */
export class CharacterComponentText extends CharacterComponent {
  readonly graphicType: string = 'text';
  protected _createGraphic(): Graphic {
    return new GraphicText(StoryComponentType.TEXT, this as any);
  }

  applyConfig(updateAttr: Record<string, any>): void {
    const { position, options = {} } = updateAttr;
    if (position) {
      this.group.setAttributes(position);
      this._graphic.setAttributes({ width: position.width, height: position.height });
    }
    if (options.graphic) {
      const attrs = { ...options.graphic };
      this._graphic.setAttributes(attrs);
    }
  }
}
