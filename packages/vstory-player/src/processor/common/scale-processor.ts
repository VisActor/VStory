import type { EasingType, IGraphic } from '@visactor/vrender-core';
import type { ICharacter } from '@visactor/vstory-core';
import { IAnimationParams } from '@visactor/vstory-core';
import type { IFadeInParams, IScaleInParams, IScaleToParams } from './interface';
import { getCharacterByEffect, getCharacterParentGraphic } from './common';
import { canDoGraphicAnimation } from './utils';

export function scaleTo(character: ICharacter, animation: IScaleToParams, scaleTo: { scaleX: number; scaleY: number }) {
  const graphic = getCharacterParentGraphic(character);
  if (graphic) {
    const { duration, easing } = animation;
    if (scaleTo) {
      graphic.animate().to(scaleTo, duration, easing as EasingType);
    }
  }
}

export function scaleIn(character: ICharacter, animation: IFadeInParams, effect: string) {
  const graphics = getCharacterByEffect(character, effect) as IGraphic[];
  graphics.forEach(graphic => _scale(graphic, animation as any, true));
}
export function scaleOut(character: ICharacter, animation: IFadeInParams, effect: string) {
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

  const currScaleX = graphic.attribute.scaleX;
  const currScaleY = graphic.attribute.scaleY;
  const opacityMap = appear
    ? { fromX: 0, fromY: 0, toX: currScaleX ?? ratio, toY: currScaleY ?? ratio }
    : { fromX: currScaleX ?? ratio, fromY: currScaleY ?? ratio, toX: 0, toY: 0 };

  graphic.setAttributes({ scaleX: opacityMap.fromX, scaleY: opacityMap.fromY });
  graphic.animate().to({ scaleX: opacityMap.toX, scaleY: opacityMap.toY }, duration, easing);

  return true;
}
