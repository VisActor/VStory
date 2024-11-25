import type { ICharacter } from '../../../interface/character';
import type { IChartCharacterConfig } from '../../../interface/dsl/chart';

export interface ICharacterChart extends ICharacter {
  config: IChartCharacterConfig;
}
