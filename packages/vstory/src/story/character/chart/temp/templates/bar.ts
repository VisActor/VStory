import { TemplateChartType } from '../constant';
import type { CharacterChart } from '../../character';
import { BaseTemp } from './base-temp';
import type { StandardData, DataInfo } from '../../data/interface';

export class BarTemp extends BaseTemp {
  getSpec(data: StandardData, ctx: { character: CharacterChart }, opt?: any) {
    throw new Error('Method not implemented.');
  }
  checkDataEnable(data: StandardData, info: DataInfo, opt?: any): boolean {
    throw new Error('Method not implemented.');
  }
  static type: string = TemplateChartType.vchart;
  type: string = BarTemp.type;
  // 唯一系列类型
  seriesType = 'bar';
  // 默认是否展示总计标签
  defaultTotalLabel = true;

  protected _getSeriesSpec() {
    return {
      type: 'bar',
      stack: true
    };
  }

  afterInitializeChart(ctx: { character: CharacterChart }): void {
    // eslint-disable-next-line no-console
    console.log('afterInitializeChart');
  }
}
