import { registerImageAction } from './image';
import { registerLineAction } from './line';
import { registerPathAction } from './path';
import { registerRectAction } from './rect';
import { registerShapeAction } from './shape';
import { registerTextAction } from './text';
import { registerTimelineAction } from './timeline';
import { registerUnitAction } from './unit';
import { registerPolygonAction } from './polygon';
import { registerArcAction } from './arc';

export * from './image';
export * from './line';
export * from './path';
export * from './polygon';
export * from './rect';
export * from './shape';
export * from './text';
export * from './timeline';
export * from './unit';
export * from './arc';

export function registerVComponentAction() {
  registerTextAction();
  registerRectAction();
  registerImageAction();
  registerLineAction();
  registerPathAction();
  registerShapeAction();
  registerTimelineAction();
  registerUnitAction();
  registerPolygonAction();
  registerArcAction();
}
