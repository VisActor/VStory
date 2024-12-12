import type { IAction, IActionPayload, IActionSpec, ICharacter } from '@visactor/vstory-core';
import { ActionProcessorItem } from '../../processor-item';
import { getCharacterGraphic, getCharacterParentGraphic } from '../../common/common';
import type { EasingType } from '@visactor/vrender-core';
import { getPayload } from './utils';

export interface IComponentStylePayLoad extends IActionPayload {
  graphic?: Record<string, any>;
  text?: Record<string, any>;
  panel?: Record<string, any>;
}

export interface IComponentStyleAction extends IAction<IComponentStylePayLoad> {
  action: 'style';
}

export class CommonStyleActionProcessor extends ActionProcessorItem {
  name: 'style';

  constructor() {
    super();
  }

  getStartTimeAndDuration(action: IActionSpec): { startTime: number; duration: number } {
    const { startTime: globalStartTime = 0 } = action;
    const { startTime = 0, duration = 0 } = getPayload(action).animation ?? ({} as any);

    const st = globalStartTime + startTime;
    const d = duration;
    return {
      startTime: st,
      duration: d
    };
  }

  run(character: ICharacter, actionSpec: IComponentStyleAction): void {
    super.preRun(character, actionSpec);
    const {
      animation = {},
      graphic: graphicStyle,
      text: textStyle,
      panel: panelStyle
    } = getPayload(actionSpec) as IComponentStylePayLoad;
    const { duration, easing } = animation as any;
    const characters = getCharacterGraphic(character);
    const component = getCharacterParentGraphic(character);
    const text = characters[0];
    const graphic = characters[characters.length - 1];

    // 这些属性都设置给component，由component下发给graphic
    const componentStyle: any = { ...panelStyle };
    ['x', 'y', 'dx', 'dy', 'scaleX', 'scaleY', 'width', 'height'].forEach(key => {
      if (key in graphicStyle) {
        componentStyle[key] = graphicStyle[key];
        delete graphicStyle[key];
      }
    });
    if (component) {
      // 获取到x，y，width，height，scaleX，scaleY，将这些属性应用到component上
      // TODO component动画优化
      if (component.styleAnimate) {
        component.styleAnimate(componentStyle, animation);
      } else {
        component.animate().to(componentStyle, duration, easing as EasingType);
      }
    }
    if (graphic && graphicStyle) {
      if (graphic.styleAnimate) {
        graphic.styleAnimate(graphicStyle, animation);
      } else {
        graphic.animate().to(graphicStyle, duration, easing as EasingType);
      }
    }
    if (text && textStyle) {
      // TODO 鲁棒性，考虑更兼容的方式
      // 特殊处理textConfig
      if (textStyle.text && (text.attribute as any).textConfig) {
        textStyle.textConfig = [{ ...((text.attribute as any).textConfig || [])[0], text: textStyle.text }];
      }
      text.animate().to(textStyle, duration, easing as EasingType);
    }
  }
}
