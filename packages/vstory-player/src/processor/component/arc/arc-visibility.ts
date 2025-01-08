import type { IArc } from '@visactor/vrender-core';
import type { IAnimationParams } from '@visactor/vstory-core';
import { globalProcessorRegistry, CharacterType } from '@visactor/vstory-core';
import { CommonVisibilityActionProcessor } from '../common/visibility';
import { ACTION_TYPE } from '../../constants/action';
import { CommonStyleActionProcessor } from '../common/style';
import { CommonMoveToActionProcessor } from '../common/move';
import { CommonScaleToActionProcessor } from '../common/scale';
import { CommonBounceActionProcessor } from '../common/bounce';
import { BaseVisibility } from '../../common/base-visibility-processor';

export interface IAngleParams extends IAnimationParams {
  from?: {
    startAngle?: number;
    endAngle?: number;
  };
}

export class ArcGrowAngle extends BaseVisibility {
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

const arcGrowAngleInstance = new ArcGrowAngle();

export interface IRadiusParams extends IAnimationParams {
  from?: {
    innerRadius?: number;
    outerRadius?: number;
  };
}

export class ArcGrowRadius extends BaseVisibility {
  protected _setInitAttributes(graphic: IArc, params: IRadiusParams, appear: boolean) {
    if (!appear) {
      return;
    }
    graphic._vstory_lastInnerRadius = graphic.attribute.innerRadius;
    graphic._vstory_lastOuterRadius = graphic.attribute.outerRadius;

    const { from = {} } = params;
    graphic.setAttributes({
      innerRadius: graphic.attribute.innerRadius,
      outerRadius: from.outerRadius ?? from.innerRadius ?? graphic.attribute.innerRadius
    });
  }

  protected _run(graphic: IArc, params: IRadiusParams, appear: boolean) {
    const duration = params.duration;
    const easing = params.easing;

    const currInnerRadius = graphic._vstory_lastInnerRadius ?? graphic.attribute.innerRadius;
    const currOuterRadius = graphic._vstory_lastOuterRadius ?? graphic.attribute.outerRadius;
    const attrMap = appear
      ? { innerRadius: currInnerRadius, outerRadius: currOuterRadius }
      : { innerRadius: 0, outerRadius: 0 };
    delete graphic._vstory_lastInnerRadius;
    delete graphic._vstory_lastOuterRadius;

    graphic.animate().to(attrMap, duration, easing);

    return true;
  }
}

const arcGrowRadiusInstance = new ArcGrowRadius();

export class ArcVisibilityActionProcessor extends CommonVisibilityActionProcessor {
  name: 'appearOrDisAppear';

  getEffectInstance(effect: string, appear: boolean) {
    switch (effect) {
      case 'growAngle':
        return arcGrowAngleInstance;
      case 'growRadius':
        return arcGrowRadiusInstance;
    }
    return super.getEffectInstance(effect, appear);
  }
}

export function registerArcVisibilityAction() {
  globalProcessorRegistry.registerProcessor(CharacterType.ARC, {
    [ACTION_TYPE.APPEAR]: new ArcVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new ArcVisibilityActionProcessor(),
    [ACTION_TYPE.STYLE]: new CommonStyleActionProcessor(),
    [ACTION_TYPE.MOVETO]: new CommonMoveToActionProcessor(),
    [ACTION_TYPE.SCALETO]: new CommonScaleToActionProcessor(),
    [ACTION_TYPE.BOUNCE]: new CommonBounceActionProcessor()
  });
}
