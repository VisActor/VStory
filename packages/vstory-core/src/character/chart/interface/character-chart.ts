import type { ICharacter, ICharacterRuntimeConfig } from '../../../interface/character';
import type { IChartCharacterConfig } from '../../../interface/dsl/chart';

export interface ICharacterChart extends ICharacter {
  config: IChartCharacterConfig;
  getRuntimeConfig: () => ICharacterChartRuntimeConfig;
}

export interface ICharacterChartRuntimeConfig extends ICharacterRuntimeConfig {
  config: IChartCharacterConfig;
}
