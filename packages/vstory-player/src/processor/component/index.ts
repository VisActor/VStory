import { registerImageAction } from './image';
import { registerLineAction } from './line';
import { registerRectAction } from './rect';
import { registerShapeAction } from './shape';
import { registerTextAction } from './text';
import { registerTimelineVisibilityAction } from './timeline/timeline-visibility';

export function registerVComponentAction() {
  registerTextAction();
  registerRectAction();
  registerImageAction();
  registerLineAction();
  registerShapeAction();
  registerTimelineVisibilityAction();
}
