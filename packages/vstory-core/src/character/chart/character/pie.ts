import { registerRankingBarChart } from '@visactor/vchart-extension';
import VChart from '@visactor/vchart';
import { CharacterChart } from '../character-chart';
import type { IChartGraphicAttribute } from '../graphic/vchart-graphic';

export function registerRankingBarTemp() {
  registerRankingBarChart({ VChart });
}

export class PieCharacter extends CharacterChart<IChartGraphicAttribute> {
  static type = 'Pie';
}
