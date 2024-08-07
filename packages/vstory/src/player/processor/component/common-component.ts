import type { IComponent, ISeries, IVChart } from '@visactor/vchart';
import { isObject, isString, merge } from '@visactor/vutils';
import type { ICharacter } from '../../../story/character';
import type { IAction } from '../../../story/interface';
import { ActionProcessorItem } from '../processor-item';
import type { EasingType, IGraphic } from '@visactor/vrender-core';
import type { IFadeInParams, IScaleInParams, IWipeInParams } from '../interface/appear-action';
import { canDoGraphicAnimation } from './utils';
// import { Wipe } from '../../../animate/wipeIn';

// export const appearEffectMap = {
//   fade: fadeIn,
//   scale: scaleIn,
//   // move: moveIn,
//   wipe: wipeIn
// };

function fadeIn(character: ICharacter, animation: IFadeInParams, effect: string) {
  const graphic = getCharacterParentGraphic(character);
  _fade(graphic, animation as any, true);
}
function fadeOut(character: ICharacter, animation: IFadeInParams, effect: string) {
  const graphic = getCharacterParentGraphic(character);
  _fade(graphic, animation as any, false);
}

function _fade(graphic: IGraphic, params: IFadeInParams, appear: boolean): boolean {
  if (!canDoGraphicAnimation(graphic, params)) {
    return false;
  }
  const { fade = {} } = params;
  const opacity = fade.opacity ?? params.opacity ?? 1;
  const duration = fade.duration ?? params.duration;
  const easing = fade.easing ?? params.easing;

  // TODO VRender处理opacity为0
  let from = 0.001;
  let to = opacity;
  if (!appear) {
    [from, to] = [to, from];
  }

  graphic.setAttributes({
    baseOpacity: from
  } as any);

  graphic.animate().to({ baseOpacity: to }, duration, easing as EasingType);

  return true;
}

function scaleIn(character: ICharacter, animation: IFadeInParams, effect: string) {
  const graphics = getCharacterByEffect(character, effect) as IGraphic[];
  graphics.forEach(graphic => _scale(graphic, animation as any, true));
}
function scaleOut(character: ICharacter, animation: IFadeInParams, effect: string) {
  const graphics = getCharacterByEffect(character, effect) as IGraphic[];
  graphics.forEach(graphic => _scale(graphic, animation as any, false));
}

function _scale(graphic: IGraphic, params: IScaleInParams, appear: boolean): boolean {
  if (!canDoGraphicAnimation(graphic, params)) {
    return false;
  }
  const { scale = {} } = params;
  const ratio = scale.ratio ?? params.ratio ?? 1;
  const duration = scale.duration ?? params.duration;
  const easing = scale.easing ?? params.easing;

  let from = 0;
  let to = ratio;
  if (!appear) {
    [from, to] = [to, from];
  }

  graphic.setAttributes({
    scaleX: from,
    scaleY: from
  });
  graphic.animate().to({ scaleX: to, scaleY: to }, duration, easing as EasingType);

  return true;
}

const Direction: any = {
  right: 0,
  left: 1,
  top: 2,
  bottom: 3
};

function wipeIn(character: ICharacter, animation: IFadeInParams, effect: string) {
  const graphic = getCharacterParentGraphic(character);
  _wipe(graphic, animation as any, true);
}
function wipeOut(character: ICharacter, animation: IFadeInParams, effect: string) {
  const graphic = getCharacterParentGraphic(character);
  _wipe(graphic, animation as any, false);
}
function _wipe(graphic: IGraphic, params: IWipeInParams, appear: boolean) {
  if (!canDoGraphicAnimation(graphic, params)) {
    return false;
  }

  const { wipe = {} } = params;
  const from = wipe.from ?? params.from ?? 'right';
  const duration = wipe.duration ?? params.duration;
  const easing = wipe.easing ?? params.easing;

  let fromRatio = 0;
  let toRatio = 1;
  if (!appear) {
    [fromRatio, toRatio] = [toRatio, fromRatio];
  }

  graphic.setAttributes({
    wipeDirection: Direction[from],
    wipeRatio: fromRatio
  } as any);
  graphic
    .animate()
    .to({ wipeRatio: toRatio }, duration, easing)
    .onEnd(() => {
      graphic.setAttributes({ wipeRatio: toRatio } as any);
    });
  return true;
}

export class CommonAppearActionProcessor extends ActionProcessorItem {
  name: 'appearOrDisAppear';

  constructor() {
    super();
  }

  getStartTimeAndDuration(action: IAction): { startTime: number; duration: number } {
    const { startTime: globalStartTime = 0, duration: globalDuration } = action;
    const { startTime = 0, duration = 0 } = action.payload?.animation ?? ({} as any);

    const st = globalStartTime + startTime;
    const d = globalDuration ?? duration;
    return {
      startTime: st,
      duration: d
    };
  }

  run(character: ICharacter, actionSpec: IAction): void {
    const { animation } = actionSpec.payload ?? {};
    const { effect = 'fade' } = animation ?? ({} as any);

    const effectFunc = this.getEffectFunc(effect, actionSpec.action === 'appear');

    effectFunc(character, animation as any, effect);
  }

  getEffectFunc(effect: string, appear: boolean) {
    switch (effect) {
      case 'scale':
        return appear ? scaleIn : scaleOut;
      case 'wipe':
        return appear ? wipeIn : wipeOut;
      case 'fade':
        return appear ? fadeIn : fadeOut;
    }
    return fadeIn;
  }
}

function getCharacterParentGraphic(character: ICharacter) {
  return character.getGraphicParent();
}

function getCharacterGraphic(character: ICharacter) {
  return character.getGraphicParent().getChildren() as IGraphic[];
}

function getCharacterByEffect(character: ICharacter, effect: 'move' | string) {
  // 图表仅操作父节点.
  // @ts-ignore
  if (character._graphic.type === 'chart') {
    return [getCharacterParentGraphic(character)];
  }
  // move效果, 一定是对parent的操作
  return effect === 'move' ? [getCharacterParentGraphic(character)] : getCharacterGraphic(character);
}
