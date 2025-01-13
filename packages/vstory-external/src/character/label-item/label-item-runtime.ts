import type { IComponentCharacterRuntime } from '@visactor/vstory-core';
import { BaseRuntime, RuntimeStore } from '@visactor/vstory-core';
import { LABEL_ITEM } from './constant';

export class LabelItemRuntime extends BaseRuntime implements IComponentCharacterRuntime {
  type = LABEL_ITEM;
}

export const LabelItemRuntimeInstance = new LabelItemRuntime();
RuntimeStore.register(LabelItemRuntimeInstance);
