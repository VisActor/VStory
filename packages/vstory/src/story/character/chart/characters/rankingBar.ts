import { registerRankingBarChart } from '@visactor/vchart-extension';
import { StoryFactory } from '../../../factory/factory';
import { CharacterChart } from '../character';
import { RankingBarTemp } from '../temp/templates/ranking-bar-temp';
import { VChartTemp } from '../temp/templates/vchart-temp';

// StoryFactory.registerChartTemp(RankingBarTemp.type, VChartTemp);
StoryFactory.registerChartTemp(RankingBarTemp.type, RankingBarTemp);

registerRankingBarChart();

export class RankingBarCharacter extends CharacterChart {
  static type = 'RankingBar';
}
