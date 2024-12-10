import type { IGraphic } from '@visactor/vrender-core';
import type { IScaleInParams } from './interface';
import { canDoGraphicAnimation } from './utils';

export class ScaleVisibility {
  setInitAttributes(graphic: IGraphic, animation: IScaleInParams, appear: boolean) {
    if (!appear) {
      return;
    }
    const { ratio = 0 } = animation;
    graphic._vstory_lastScaleX = graphic.attribute.scaleX ?? 1;
    graphic._vstory_lastScaleY = graphic.attribute.scaleY ?? 1;

    graphic.setAttributes({ scaleX: ratio, scaleY: ratio });
  }
  run(graphic: IGraphic, animation: IScaleInParams, appear: boolean) {
    if (!canDoGraphicAnimation(graphic, animation)) {
      return false;
    }
    if (!canDoGraphicAnimation(graphic, animation)) {
      return false;
    }

    const duration = animation.duration;
    const easing = animation.easing;

    const currScaleX = graphic._vstory_lastScaleX ?? graphic.attribute.scaleX;
    const currScaleY = graphic._vstory_lastScaleY ?? graphic.attribute.scaleY;
    const opacityMap = appear ? { toX: currScaleX ?? 1, toY: currScaleY ?? 1 } : { toX: 0, toY: 0 };
    delete graphic._vstory_lastScaleX;
    delete graphic._vstory_lastScaleY;

    graphic.animate().to({ scaleX: opacityMap.toX, scaleY: opacityMap.toY }, duration, easing);

    return true;
  }
}

export const scaleInstance = new ScaleVisibility();
