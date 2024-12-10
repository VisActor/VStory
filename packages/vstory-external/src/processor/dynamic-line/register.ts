import { registerDynamicLinePlayAction, registerDynamicLineVisibilityAction } from './dynamic-line-visibility';

export function registerDynamicLineAction() {
  registerDynamicLinePlayAction();
  registerDynamicLineVisibilityAction();
}
