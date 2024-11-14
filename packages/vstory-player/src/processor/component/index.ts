import { registerImageAction } from './image';
import { registerLineAction } from './line';
import { registerRectAction } from './rect';
import { registerShapeAction } from './shape';
import { registerTextAction } from './text';
import { registerTimelineAction } from './timeline';
import { registerUnitAction } from './unit';

export function registerVComponentAction() {
  registerTextAction();
  registerRectAction();
  registerImageAction();
  registerLineAction();
  registerShapeAction();
  registerTimelineAction();
  registerUnitAction();
}
