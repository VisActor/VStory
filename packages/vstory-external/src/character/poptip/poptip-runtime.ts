import type { IComponentCharacterRuntime } from '@visactor/vstory-core';
import { BaseRuntime } from '@visactor/vstory-core';
import { POPTIP } from './constant';

export class PopTipRuntime extends BaseRuntime implements IComponentCharacterRuntime {
  type = POPTIP;
}

export const PopTipRuntimeInstance = new PopTipRuntime();
