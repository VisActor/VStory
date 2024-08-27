import type { ISymbolGraphicAttribute } from '@visactor/vrender-core';
import type { IAction, IActionPayload, IAnimationParams } from './common-action';

export interface IStyleParams extends IAnimationParams {
  effect: 'style';
  stagger?: {
    /**
     * @description Stagger the animation of multiple elements
     * @default false
     */
    enable?: boolean;
    /**
     * @description The ratio of real animation duration to the total duration
     * @default 1/4
     */
    ratio?: number;
  };
  startIndex?: number;
  endIndex?: number;
  style?: ISymbolGraphicAttribute;
  styleFunc?: (index: number) => ISymbolGraphicAttribute;
}

export interface IComponentUnitStylePayload extends IActionPayload {
  animation: IStyleParams;
}

export interface IUnitStyleAction extends IAction<IComponentUnitStylePayload> {
  action: 'style';
}
