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
}
