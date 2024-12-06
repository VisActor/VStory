import type { EasingType, IGraphic } from '@visactor/vrender-core';
import type { IFadeInParams } from './interface';
import { canDoGraphicAnimation } from './utils';

export class FadeVisibility {
  setInitAttributes(graphic: IGraphic, params: IFadeInParams, appear: boolean) {
    if (!canDoGraphicAnimation(graphic, params)) {
      return false;
    }
    if (!appear) {
      return;
    }
    const opacity = params.opacity ?? 0;
    graphic.setAttributes({
      baseOpacity: opacity
    } as any);
  }
  run(graphic: IGraphic, params: IFadeInParams, appear: boolean) {
    if (!canDoGraphicAnimation(graphic, params)) {
      return false;
    }
    const duration = params.duration;
    const easing = params.easing;

    const toOpacity = appear ? 1 : 0;

    graphic.animate().to({ baseOpacity: toOpacity }, duration, easing as EasingType);

    return true;
  }
}

export const fadeInstance = new FadeVisibility();
