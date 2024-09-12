import { TemplateChartType } from '../constant';
import type { CharacterChart } from '../../character';
import { BaseTemp } from './base-temp';
import type { StandardData, DataInfo } from '../../data/interface';

export class ProgressPieTemp extends BaseTemp {
  static type: string = TemplateChartType.vchart;
  type: string = ProgressPieTemp.type;

  checkDataEnable(data: StandardData, opt?: any): boolean {
    return true;
  }
  getSpec(data: StandardData, opt: any) {
    return {
      type: 'pie',
      data: data,
      outerRadius: 0.8,
      valueField: 'value',
      categoryField: 'type',
      morphingkey: 'a',
      ...opt.character.specProcess.getCharacterSpec().options.spec
    };
    // TODO 转换特定chart Spec到通用common spec
    // const cartesianCommonSpec = getCartesianCommonSpec(this.direction, this.percent, this.trimPadding) as any;
    // if (cartesianCommonSpec.legends) {
    //   cartesianCommonSpec.legends.visible = this.defaultLegendVisible;
    // }

    // return getCartesianSpec(this._getSeriesSpec.bind(this), cartesianCommonSpec, this.direction, data, {
    //   multiDimensionField: this.multiDimensionField,
    //   stack: this.stack,
    //   xField: opt.character.specProcess.getCharacterSpec().options.xField,
    //   yField: opt.character.specProcess.getCharacterSpec().options.yField,
    //   seriesField: opt.character.specProcess.getCharacterSpec().options.seriesField
    // });
  }

  afterInitializeChart(ctx: { character: CharacterChart }): void {
    // eslint-disable-next-line no-console
    console.log('afterInitializeChart');
  }
}
