import type { IComponentCharacterRuntime } from '../interface/runtime';
import { BaseRuntime } from './base';

export class UnitRuntime extends BaseRuntime implements IComponentCharacterRuntime {
  type = 'Unit';
}

export const UnitRuntimeInstance = new UnitRuntime();
