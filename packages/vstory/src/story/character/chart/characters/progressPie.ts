import { StoryFactory } from '../../../factory/factory';
import { CharacterChart } from '../character';
import { ProgressPieTemp } from '../temp/templates/progress-pie';

StoryFactory.registerChartTemp(ProgressPieTemp.type, ProgressPieTemp);

export class ProgressPieCharacter extends CharacterChart {
  static type = 'ProgressPie';
}
