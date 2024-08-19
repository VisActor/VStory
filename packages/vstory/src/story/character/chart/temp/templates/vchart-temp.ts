import type { StandardData } from '../../data/interface';
import { BaseTemp } from './base-temp';
import { TemplateChartType } from '../constant';

export class VChartTemp extends BaseTemp {
  static type: string = TemplateChartType.vchart;
  type: string = VChartTemp.type;
  checkDataEnable(data: StandardData, opt?: any): boolean {
    return true;
  }
  getSpec(data: StandardData, opt: any) {
    // TODO 转换特定chart Spec到通用common spec
    return opt.character.spec.options.spec as any;
  }
}
