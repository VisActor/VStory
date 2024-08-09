import type { IAction, IActionPayload } from './common-action';

interface IComponentStylePayLoad extends IActionPayload {
  graphic: Record<string, any>;
  text: Record<string, any>;
}

export interface IComponentStyleAction extends IAction<IComponentStylePayLoad> {
  action: 'style';
}

interface IComponentMoveToPayLoad extends IActionPayload {
  destination: { x: number; y: number };
}
export interface IComponentMoveToAction extends IAction<IComponentMoveToPayLoad> {
  action: 'moveTo';
}
