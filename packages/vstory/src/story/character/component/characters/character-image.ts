import type { Graphic } from '../graphic/graphic';
import { CharacterComponent } from '../character';
import { StoryGraphicType } from '../../../../dsl/constant';
import { GraphicImage } from '../graphic/image';

export class CharacterComponentImage extends CharacterComponent {
  readonly graphicType: string = 'image';
  protected _createGraphic(): Graphic {
    return new GraphicImage(StoryGraphicType.IMAGE, this as any);
  }
}
