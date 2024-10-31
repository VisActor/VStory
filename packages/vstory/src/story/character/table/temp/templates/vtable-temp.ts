import { BaseTemp } from './base-temp';
import { TemplateTableType } from '../constant';
import type { StandardData } from '../../../visactor/interface';

export class VTableTemp extends BaseTemp {
  static type: string = TemplateTableType.vtable;
  type: string = VTableTemp.type;
  checkDataEnable(data: StandardData, opt?: any): boolean {
    return true;
  }
  getSpec(data: StandardData, opt: any) {
    // TODO 转换特定chart Spec到通用common spec
    return opt.character.config.options.spec as any;
  }
}
