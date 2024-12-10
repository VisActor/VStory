import type { IActionSpec, ICharacter } from '@visactor/vstory-core';
import { globalProcessorRegistry } from '@visactor/vstory-core';
import type { IArc, IGraphic } from '@visactor/vrender-core';
import {
  ACTION_TYPE,
  BaseVisibility,
  CommonBounceActionProcessor,
  CommonMoveToActionProcessor,
  CommonScaleToActionProcessor,
  CommonStyleActionProcessor,
  CommonVisibilityActionProcessor
} from '@visactor/vstory-player';
import { SINGLE_PIE } from '../../character/single-pie/constant';
import type { IAngleParams } from './interface';

export class DefaultVisibility extends BaseVisibility {
  protected _setInitAttributes(graphic: IArc, params: IAngleParams, appear: boolean) {
    if (!appear) {
      return;
    }
    graphic._vstory_lastEndAngle = graphic.attribute.endAngle;
    graphic._vstory_lastStartAngle = graphic.attribute.startAngle;

    const { from = {} } = params;
    graphic.setAttributes({
      startAngle: graphic.attribute.startAngle,
      endAngle: from.endAngle ?? from.startAngle ?? graphic.attribute.startAngle
    });
  }

  protected _run(graphic: IArc, params: any, appear: boolean) {
    const duration = params.duration;
    const easing = params.easing;

    const currStartAngle = graphic._vstory_lastStartAngle ?? graphic.attribute.startAngle;
    const currEndAngle = graphic._vstory_lastEndAngle ?? graphic.attribute.endAngle;
    const attrMap = appear ? { startAngle: currStartAngle, endAngle: currEndAngle } : { startAngle: 0, endAngle: 0 };
    delete graphic._vstory_lastEndAngle;
    delete graphic._vstory_lastStartAngle;

    graphic.animate().to(attrMap, duration, easing);

    return true;
  }
}

const defaultInstance = new DefaultVisibility();

export class SinglePieVisibilityActionProcessor extends CommonVisibilityActionProcessor {
  name: string = 'appearOrDisAppear';
  constructor() {
    super();
  }

  getEffectInstance(effect: string, appear: boolean) {
    switch (effect) {
      case 'angle':
        return defaultInstance;
    }
    return super.getEffectInstance(effect, appear);
  }
}

export function registerSinglePieVisibilityAction() {
  globalProcessorRegistry.registerProcessor(SINGLE_PIE, {
    [ACTION_TYPE.APPEAR]: new SinglePieVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new SinglePieVisibilityActionProcessor(),
    [ACTION_TYPE.STYLE]: new CommonStyleActionProcessor(),
    [ACTION_TYPE.MOVETO]: new CommonMoveToActionProcessor(),
    [ACTION_TYPE.SCALETO]: new CommonScaleToActionProcessor(),
    [ACTION_TYPE.BOUNCE]: new CommonBounceActionProcessor()
  });
}
