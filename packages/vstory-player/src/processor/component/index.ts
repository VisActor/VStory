import { registerImageAction } from './image';
import { registerLineAction } from './line';
import { registerRectAction } from './rect';
import { registerShapeAction } from './shape';
import { registerTextAction } from './text';

export function registerVComponentAction() {
  registerTextAction();
  registerRectAction();
  registerImageAction();
  registerLineAction();
  registerShapeAction();
}
