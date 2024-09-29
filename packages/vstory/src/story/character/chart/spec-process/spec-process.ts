import type { IChartCharacterConfig } from '../../dsl-interface';
import { cloneDeep } from '@visactor/vutils';
import type { IChartSpecProcess } from './interface';
import type { ChartDataTempTransform } from './data-temp-transform';
import { SpecProcessBase } from '../../visactor/spec-process-base';

// const DefaultEditorSpec: IChartCharacterConfig = {
//   type: null,
//   zIndex: 0,
//   id: '',
//   position: undefined,
//   options: {
//     data: null
//   }
// };

// @ts-ignore
export class SpecProcess extends SpecProcessBase implements IChartSpecProcess {
  // 编辑器spec 存储和加载都是这个数据结构
  // 保证结构可序列化。
  // protected _characterConfig: IChartCharacterConfig = cloneDeep(DefaultEditorSpec);

  // @ts-ignore
  protected declare _character: any;

  protected declare _dataTempTransform: ChartDataTempTransform;

  updateConfig(config: IChartCharacterConfig) {
    this._characterConfig = config;
    this._dataTempTransform.updateChartTemp(this._characterConfig.type);
  }

  protected _mergeConfig() {
    return;
  }
}
