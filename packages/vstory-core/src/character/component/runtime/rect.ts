import type { IComponentCharacterRuntime } from '../interface/runtime';
import { BaseRuntime } from './base';

export class RectRuntime extends BaseRuntime implements IComponentCharacterRuntime {
  type = 'Rect';
}
