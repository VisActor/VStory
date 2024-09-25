import type { Graphic } from '../graphic/graphic';
import { CharacterComponent } from '../character';
import { StoryComponentType } from '../../../../constants/character';
import { GraphicImage } from '../graphic/image';
import type { StoryEvent } from '../../../interface';
import type { ICharacterPickInfo } from '../../runtime-interface';

export class CharacterComponentImage extends CharacterComponent {
  readonly graphicType: string = 'image';
  protected _createGraphic(): Graphic {
    return new GraphicImage(StoryComponentType.IMAGE, this as any);
  }

  applyConfig(updateAttr: Record<string, any>): void {
    const { position, options = {} } = updateAttr;
    // const attr = { ...(position ?? {}), ...rest };
    if (position) {
      this.group.setAttributes(position);
      this._graphic.setAttributes({ width: position.width, height: position.height });
    }
    if (options.graphic) {
      const attrs = { ...options.graphic };
      this._graphic.setAttributes(attrs);
    }
    if (options.text) {
      this._text.updateAttribute(options.text);
    }
  }

  checkEvent(event: StoryEvent): false | ICharacterPickInfo {
    const info = super.checkEvent(event);
    if (info && event.path[event.path.length - 1] === this._group) {
      return false;
    }
    return info;
  }
}
