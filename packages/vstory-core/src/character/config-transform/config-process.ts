import { cloneDeep, isValid, merge } from '@visactor/vutils';
import type { ICharacter } from '../../interface/character';
import { deepMergeWithDeletedAttr } from '../../utils/merge';
import type { IConfigProcess } from './interface';
import type { IUpdateConfigParams } from '../chart/interface/runtime';

export class ConfigProcessBase implements IConfigProcess {
  protected _character: ICharacter;

  constructor(character: ICharacter) {
    this._character = character;
  }

  checkEnable(diffConfig: IUpdateConfigParams, config: IUpdateConfigParams) {
    return true;
  }

  updateConfig(
    diffConfig: IUpdateConfigParams,
    config: IUpdateConfigParams,
    targetConfig: IUpdateConfigParams
  ): boolean {
    // 先合并到临时对象
    const nextTargetConfig = cloneDeep(targetConfig);
    this.mergeConfig(diffConfig, config, nextTargetConfig);
    // 判定是否合法，如果合法，就完成合并
    if (this.checkEnable(diffConfig, targetConfig)) {
      merge(targetConfig, nextTargetConfig);
      return true;
    }
    return false;
  }

  protected mergeConfig(
    diffConfig: IUpdateConfigParams,
    config: IUpdateConfigParams,
    targetConfig: IUpdateConfigParams
  ) {
    const { position, zIndex, options } = diffConfig;
    if (position) {
      targetConfig.position = position;
    }
    if (isValid(zIndex)) {
      targetConfig.zIndex = zIndex;
    }
    if (options) {
      targetConfig.options = deepMergeWithDeletedAttr(targetConfig.options ?? {}, options);
    }
    return true;
  }
}
