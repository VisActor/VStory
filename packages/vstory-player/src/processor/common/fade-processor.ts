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
    if (graphic.isContainer) {
      const opacity = 0;
      graphic.setAttributes({
        baseOpacity: opacity
      } as any);
    } else {
      const opacity = params.opacity ?? 0;
      graphic._vstory_lastOpacity = graphic.attribute.opacity ?? 1;
      graphic.setAttributes({
        opacity
      } as any);
    }
  }
  run(graphic: IGraphic, params: IFadeInParams, appear: boolean) {
    if (!canDoGraphicAnimation(graphic, params)) {
      return false;
    }
    const duration = params.duration;
    const easing = params.easing;

    if (graphic.isContainer) {
      graphic.animate().to({ baseOpacity: appear ? 1 : 0 }, duration, easing as EasingType);
    } else {
      const opacity = graphic._vstory_lastOpacity ?? 1;
      graphic.animate().to({ opacity: appear ? opacity : 0 }, duration, easing as EasingType);
      delete graphic._vstory_lastOpacity;
    }

    return true;
  }
}

export const fadeInstance = new FadeVisibility();
