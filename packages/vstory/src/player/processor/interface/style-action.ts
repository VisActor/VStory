import type { IAction, IActionPayload } from './common-action';

interface IComponentStylePayLoad extends IActionPayload {
  graphic: Record<string, any>;
  text: Record<string, any>;
}

export interface IComponentStyleAction extends IAction<IComponentStylePayLoad> {
  action: 'style';
}
