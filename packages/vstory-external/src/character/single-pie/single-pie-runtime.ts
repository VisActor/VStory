import type { IComponentCharacterRuntime } from '@visactor/vstory-core';
import { BaseRuntime } from '@visactor/vstory-core';

export class SinglePieRuntime extends BaseRuntime implements IComponentCharacterRuntime {
  type = 'SinglePie';
}

export const SinglePieRuntimeInstance = new SinglePieRuntime();
