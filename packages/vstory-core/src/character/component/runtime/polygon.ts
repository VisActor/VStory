import type { IComponentCharacterRuntime } from '../interface/runtime';
import { BaseRuntime } from './base';

export class PolygonRuntime extends BaseRuntime implements IComponentCharacterRuntime {
  type = 'Polygon';
}

export const PolygonRuntimeInstance = new PolygonRuntime();
