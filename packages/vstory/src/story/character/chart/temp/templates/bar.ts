import { ICharacter } from './../../../runtime-interface';
import { TemplateChartType } from '../constant';
import { CartesianSingleSeriesTemp } from './cartesian-single';
import type { CharacterChart } from '../../character';

export class BarTemp extends CartesianSingleSeriesTemp {
  static type: string = TemplateChartType.bar;
  type: string = BarTemp.type;
  // 唯一系列类型
  seriesType = 'bar';
  // 默认是否展示总计标签
  defaultTotalLabel = true;

  protected _getSeriesSpec() {
    return {
      type: 'bar',
      stack: true,
      direction: this.direction
    };
  }

  afterInitializeChart(ctx: { character: CharacterChart }): void {
    // eslint-disable-next-line no-console
    console.log('afterInitializeChart');
  }
}
