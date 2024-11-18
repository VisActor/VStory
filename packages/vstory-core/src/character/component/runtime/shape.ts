import type { IComponentCharacterRuntime } from '../interface/runtime';
import { BaseRuntime } from './base';

export class ShapeRuntime extends BaseRuntime implements IComponentCharacterRuntime {
  type = 'Shape';
}
