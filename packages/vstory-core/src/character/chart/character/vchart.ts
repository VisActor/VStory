import { CharacterType } from '../../../constants/character';
import { CharacterChart } from '../character-chart';
import type { IChartGraphicAttribute } from '../graphic/vchart-graphic';

export class VChartCharacter extends CharacterChart<IChartGraphicAttribute> {
  static type = CharacterType.VCHART;
}
