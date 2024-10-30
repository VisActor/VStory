import { BaseTemp } from './base-temp';
import { TemplateTableType } from '../constant';
import type { StandardData } from '../../../visactor/interface';
import { WeatherBox } from '@visactor/vrender-components';

export class WeatherTableTemp extends BaseTemp {
  static type: string = TemplateTableType.weatherTable;
  type: string = WeatherTableTemp.type;
  checkDataEnable(data: StandardData, opt?: any): boolean {
    return true;
  }
  getSpec(data: StandardData, opt: any) {
    // TODO 转换特定chart Spec到通用common spec
    return opt.character.config.options.spec as any;
  }
}
