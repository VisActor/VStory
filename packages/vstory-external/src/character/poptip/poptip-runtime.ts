import type { IComponentCharacterRuntime } from '@visactor/vstory-core';
import { POPTIP } from './constant';
import { BaseRuntime, RuntimeStore } from '@visactor/vstory-core';

export class PopTipRuntime extends BaseRuntime implements IComponentCharacterRuntime {
  type = POPTIP;
}

export const PopTipRuntimeInstance = new PopTipRuntime();
RuntimeStore.register(PopTipRuntimeInstance);
