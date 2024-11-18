import type { EasingType, IGraphic } from '@visactor/vrender-core';
import { getCharacterByEffect, getCharacterParentGraphic } from './common';
import type { IFadeInParams } from './interface';
import type { ICharacter } from '@visactor/vstory-core';
import { canDoGraphicAnimation } from './utils';

export function clipRangeIn(character: ICharacter, animation: IFadeInParams, effect: string) {
  const graphics = getCharacterByEffect(character, effect);
  graphics.forEach(graphic => _clipRange(graphic, animation as any, true));
}
export function clipRangeOut(character: ICharacter, animation: IFadeInParams, effect: string) {
  const graphics = getCharacterByEffect(character, effect);
  graphics.forEach(graphic => _clipRange(graphic, animation as any, false));
}

function _clipRange(graphic: IGraphic, params: IFadeInParams, appear: boolean): boolean {
  if (!canDoGraphicAnimation(graphic, params)) {
    return false;
  }
  const { fade = {} } = params;
  const duration = fade.duration ?? params.duration;
  const easing = fade.easing ?? params.easing;
  const currClipRange = (graphic.attribute as any).clipRange ?? 1;

  const clipRangeMap = appear ? { from: 0, to: currClipRange } : { from: currClipRange, to: 0 };

  graphic.setAttributes({
    clipRange: clipRangeMap.from
  } as any);

  graphic.animate().to({ clipRange: clipRangeMap.to }, duration, easing as EasingType);

  return true;
}
