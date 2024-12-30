import type { IComponentCharacterRuntime } from '../interface/runtime';
import { BaseRuntime } from './base';

export class ArcRuntime extends BaseRuntime implements IComponentCharacterRuntime {
  type = 'Arc';
}

export const ArcRuntimeInstance = new ArcRuntime();
