import type { EasingType, IGraphic } from '@visactor/vrender-core';
import type { IFadeInParams } from './interface';
import { canDoGraphicAnimation } from './utils';

function _clipRange(graphic: IGraphic, params: IFadeInParams, appear: boolean): boolean {
  if (!canDoGraphicAnimation(graphic, params)) {
    return false;
  }
  const { fade = {} } = params;
  const duration = fade.duration ?? params.duration;
  const easing = fade.easing ?? params.easing;
  const currClipRange = (graphic.attribute as any).clipRange ?? 1;

  const clipRangeMap = appear ? { from: 0, to: currClipRange } : { from: currClipRange, to: 0 };

  graphic.setAttributes({
    clipRange: clipRangeMap.from
  } as any);

  graphic.animate().to({ clipRange: clipRangeMap.to }, duration, easing as EasingType);

  return true;
}
