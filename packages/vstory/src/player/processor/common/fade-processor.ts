import type { EasingType, IGraphic } from '@visactor/vrender-core';
import type { ICharacter } from '../../../story/character';
import { getCharacterParentGraphic } from './common';
import { canDoGraphicAnimation } from '../component/utils';
import type { IFadeInParams } from '../interface/appear-action';

export function fadeIn(character: ICharacter, animation: IFadeInParams, effect: string) {
  const graphic = getCharacterParentGraphic(character);
  _fade(graphic, animation as any, true);
}
export function fadeOut(character: ICharacter, animation: IFadeInParams, effect: string) {
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
  const currOpacity = (graphic.attribute as any).baseOpacity;

  const opacityMap = appear ? { from: 0, to: currOpacity ?? 1 } : { from: currOpacity ?? 1, to: 0 };

  graphic.setAttributes({
    baseOpacity: opacityMap.from
  } as any);

  graphic.animate().to({ baseOpacity: opacityMap.to }, duration, easing as EasingType);

  return true;
}
