import type { IComponentCharacterRuntime } from '../interface/runtime';
import { BaseRuntime } from './base';

export class ImageRuntime extends BaseRuntime implements IComponentCharacterRuntime {
  type = 'Image';
}
