import type { ITableCharacterConfig } from '../../dsl-interface';
import { cloneDeep } from '@visactor/vutils';
import { SpecProcessBase } from '../../visactor/spec-process-base';
import type { ITableSpecProcess } from './interface';

// @ts-ignore
export class SpecProcess extends SpecProcessBase implements ITableSpecProcess {
  // 编辑器spec 存储和加载都是这个数据结构
  // 保证结构可序列化。
  // protected _characterConfig: IChartCharacterConfig = cloneDeep(DefaultEditorSpec);

  // @ts-ignore
  protected declare _character: any;

  // protected declare _dataTempTransform: ChartDataTempTransform;

  updateConfig(config: ITableCharacterConfig) {
    this._characterConfig = config;
    this._dataTempTransform.updateChartTemp(this._characterConfig.type);
  }

  protected _mergeConfig() {
    return;
  }
}
