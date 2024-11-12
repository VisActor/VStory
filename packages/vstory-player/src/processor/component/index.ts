import { registerImageAction } from './image';
import { registerRectAction } from './rect';
import { registerTextAction } from './text';

export function registerVComponentAction() {
  registerTextAction();
  registerRectAction();
  registerImageAction();
}
