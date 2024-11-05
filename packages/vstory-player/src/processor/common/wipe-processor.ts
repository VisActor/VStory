import type { IGraphic } from '@visactor/vrender-core';
import { getCharacterParentGraphic } from './common';
import type { IWipeInParams } from './interface';
import { IFadeInParams } from './interface';
import type { ICharacter } from '@visactor/vstory-core';
import { canDoGraphicAnimation } from './utils';

const Direction: any = {
  right: 'l2r',
  left: 'r2l',
  top: 't2b',
  bottom: 'b2t'
};

export function wipeIn(character: ICharacter, animation: IWipeInParams, effect: string) {
  const graphic = getCharacterParentGraphic(character);
  _wipe(graphic, animation as any, true);
}
export function wipeOut(character: ICharacter, animation: IWipeInParams, effect: string) {
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
