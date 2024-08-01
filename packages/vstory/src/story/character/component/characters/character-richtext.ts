import type { Graphic } from '../graphic/graphic';
import { GraphicRichText } from '../graphic/richtext';
import { CharacterComponent } from '../character';
import { StoryGraphicType } from '../../../../constants/character';

export class CharacterComponentRichText extends CharacterComponent {
  readonly graphicType: string = 'richtext';
  protected _createGraphic(): Graphic {
    return new GraphicRichText(StoryGraphicType.RICH_TEXT, this as any);
  }
}
