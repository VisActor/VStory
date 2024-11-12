import { registerRectVisibilityAction } from './rect/rect-visibility';
import { registerTextVisibilityAction } from './text/text-visibility';

export function registerVComponentAction() {
  registerTextVisibilityAction();
  registerRectVisibilityAction();
}
