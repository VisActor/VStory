import type { EasingType, IGraphic } from '@visactor/vrender-core';
import type { IClipRangeParams } from './interface';
import { canDoGraphicAnimation } from './utils';
import { BaseVisibility } from './base-visibility-processor';

export class ClipRangeVisibility extends BaseVisibility {
  protected _setInitAttributes(graphic: IGraphic, params: IClipRangeParams, appear: boolean) {
    if (!canDoGraphicAnimation(graphic, params)) {
      return false;
    }
    if (!appear) {
      return;
    }
    const fromClipRange = params.clipRange ?? 0;
    graphic._vstory_lastScaleClipRange = (graphic.attribute as any).clipRange ?? 1;
    graphic.setAttributes({
      clipRange: fromClipRange
    } as any);
  }
  protected _run(graphic: IGraphic, params: IClipRangeParams, appear: boolean) {
    if (!canDoGraphicAnimation(graphic, params)) {
      return false;
    }
    const { fade = {} } = params;
    const duration = fade.duration ?? params.duration;
    const easing = fade.easing ?? params.easing;
    const currClipRange = graphic._vstory_lastScaleClipRange ?? 1;

    const toRange = appear ? currClipRange : 0;

    graphic.animate().to({ clipRange: toRange }, duration, easing as EasingType);

    return true;
  }
}

export const clipRangeInstance = new ClipRangeVisibility();
