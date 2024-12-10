import type { IGraphic } from '@visactor/vrender-core';
import type { IWipeInParams } from './interface';
import { canDoGraphicAnimation } from './utils';

const Direction: any = {
  right: 'l2r',
  left: 'r2l',
  top: 't2b',
  bottom: 'b2t'
};

export class WipeVisibility {
  setInitAttributes(graphic: IGraphic, params: IWipeInParams, appear: boolean) {
    if (!canDoGraphicAnimation(graphic, params)) {
      return false;
    }
    if (!appear) {
      return;
    }
    const { fromRatio = 0 } = params;
    const from = params.from ?? 'right';
    graphic.setAttributes({
      wipeDirection: Direction[from],
      wipeRatio: fromRatio
    } as any);
  }
  run(graphic: IGraphic, params: IWipeInParams, appear: boolean) {
    if (!canDoGraphicAnimation(graphic, params)) {
      return false;
    }

    const duration = params.duration;
    const easing = params.easing;

    let fromRatio = 0;
    let toRatio = 1;
    if (!appear) {
      [fromRatio, toRatio] = [toRatio, fromRatio];
    }

    graphic
      .animate()
      .to({ wipeRatio: toRatio }, duration, easing)
      .onEnd(() => {
        graphic.setAttributes({ wipeRatio: toRatio } as any);
      });
    return true;
  }
}

export const wipeInstance = new WipeVisibility();
