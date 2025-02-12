import { registerRankingBarChart } from '@visactor/vchart-extension';
import { VChart } from '@visactor/vchart';

import { StoryFactory } from '../../../factory/factory';
import { CharacterChart } from '../character';
import { RankingBarTemp } from '../temp/templates/ranking-bar-temp';

StoryFactory.registerChartTemp(RankingBarTemp.type, RankingBarTemp);

registerRankingBarChart({ VChart });

export class RankingBarCharacter extends CharacterChart {
  static type = 'RankingBar';
}
