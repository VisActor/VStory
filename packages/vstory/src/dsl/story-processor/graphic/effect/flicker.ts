import type { EasingType, IGraphic } from '@visactor/vrender';
import type { IFlickerParams } from '../../../types';

export function flicker(graphic: IGraphic, params: IFlickerParams) {
  if (graphic) {
    const { duration, easing, frequency = 2 } = params;
    const loopDuration = duration / frequency;
    graphic
      .animate()
      .from({ opacity: 0 }, loopDuration, easing as EasingType)
      .loop(frequency);
  }
}
