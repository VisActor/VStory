import { registerLiquidChart, registerMosaicChart, registerVennChart } from '@visactor/vchart';
export { registerLiquidChart, registerMosaicChart, registerVennChart } from '@visactor/vchart';

import { CharacterType } from '../../../constants/character';
import { CharacterChart } from '../character-chart';
import type { IChartGraphicAttribute } from '../graphic/vchart-graphic';

export class VChartCharacter extends CharacterChart<IChartGraphicAttribute> {
  static type = CharacterType.VCHART;
}

export const registerAllVChart = () => {
  registerVennChart();
  registerLiquidChart();
  registerMosaicChart();
};
