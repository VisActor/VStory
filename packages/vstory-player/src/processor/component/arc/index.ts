import { registerArcVisibilityAction } from './arc-visibility';
export { ArcGrowAngle } from './arc-visibility';
export type { IAngleParams } from './arc-visibility';

export function registerArcAction() {
  registerArcVisibilityAction();
}
