import { StoryFactory } from '../../../factory/factory';
import { CharacterChart } from '../character';
import { VChartTemp } from '../temp/templates/vchart-temp';

StoryFactory.registerChartTemp(VChartTemp.type, VChartTemp);

export class VChartCharacter extends CharacterChart {
  static type = 'VChart';
}
