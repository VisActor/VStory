import type { IGraphic } from '@visactor/vrender-core';
import type { ICharacter } from '../../../story/character';
import { getCharacterParentGraphic } from './common';
import { canDoGraphicAnimation } from '../component/utils';
import type { IFadeInParams, IWipeInParams } from '../interface/appear-action';
import { IScaleInParams } from '../interface/appear-action';

const Direction: any = {
  right: 0,
  left: 1,
  top: 2,
  bottom: 3
};

export function wipeIn(character: ICharacter, animation: IFadeInParams, effect: string) {
  const graphic = getCharacterParentGraphic(character);
  _wipe(graphic, animation as any, true);
}
export function wipeOut(character: ICharacter, animation: IFadeInParams, effect: string) {
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
