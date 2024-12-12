import { globalProcessorRegistry } from '@visactor/vstory-core';
import type { IArc } from '@visactor/vrender-core';
import {
  ACTION_TYPE,
  BaseVisibility,
  CommonBounceActionProcessor,
  CommonMoveToActionProcessor,
  CommonScaleToActionProcessor,
  CommonStyleActionProcessor,
  CommonVisibilityActionProcessor
} from '@visactor/vstory-player';
import { LABEL_ITEM } from '../../character/label-item/constant';

export class DefaultVisibility extends BaseVisibility {
  protected _setInitAttributes(graphic: IArc, params: any, appear: boolean) {
    if (!appear) {
      return;
    }
    // todo 添加appear属性的初始化逻辑
  }

  protected _run(graphic: IArc, params: any, appear: boolean) {
    if (appear && graphic && graphic.appearAnimate) {
      graphic.appearAnimate(params);
    } else if (!appear && graphic && graphic.disappearAnimate) {
      graphic.disappearAnimate(params);
    }

    return true;
  }
}

const defaultInstance = new DefaultVisibility();

export class LabelItemVisibilityActionProcessor extends CommonVisibilityActionProcessor {
  name: string = 'appearOrDisAppear';
  constructor() {
    super();
  }

  getEffectInstance(effect: string, appear: boolean) {
    switch (effect) {
      case 'default':
        return defaultInstance;
    }
    return super.getEffectInstance(effect, appear);
  }
}

export function registerLabelItemVisibilityAction() {
  globalProcessorRegistry.registerProcessor(LABEL_ITEM, {
    [ACTION_TYPE.APPEAR]: new LabelItemVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new LabelItemVisibilityActionProcessor(),
    [ACTION_TYPE.STYLE]: new CommonStyleActionProcessor(),
    [ACTION_TYPE.MOVETO]: new CommonMoveToActionProcessor(),
    [ACTION_TYPE.SCALETO]: new CommonScaleToActionProcessor(),
    [ACTION_TYPE.BOUNCE]: new CommonBounceActionProcessor()
  });
}
