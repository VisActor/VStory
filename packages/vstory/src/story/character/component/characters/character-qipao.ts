import type { Graphic } from '../graphic/graphic';
import { GraphicQipao } from '../graphic/qipao';
import { CharacterComponent } from '../character';

export class CharacterComponentQipao extends CharacterComponent {
  readonly graphicType: string = 'qipao';
  protected _createGraphic(): Graphic {
    return new GraphicQipao('QipaoComponent', this);
  }
}
