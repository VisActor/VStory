import type { IGraphic, ISymbol } from '@visactor/vrender-core';
import type { ICharacter } from '../../../../story/character';
import { getCharacterByEffect } from '../../common/common';
import type { IStyleParams, IUnitStyleAction } from '../../interface/unit-action';
import { CommonStyleActionProcessor, CommonVisibilityActionProcessor } from '../common-component';

export class UnitVisibilityActionProcessor extends CommonVisibilityActionProcessor {
  name: 'appearOrDisAppear';

  getEffectFunc(effect: string, appear: boolean) {
    switch (effect) {
      case 'style':
        return style;
    }
    return super.getEffectFunc(effect, appear);
  }
}

export class UnitStyleActionProcessor extends CommonStyleActionProcessor {
  run(character: ICharacter, actionSpec: IUnitStyleAction): void {
    style(character, actionSpec.payload.animation, actionSpec.payload.animation.effect);
  }
}

export function style(character: ICharacter, animation: IStyleParams, effect: string) {
  const graphics = getCharacterByEffect(character, effect)[0];
  _style(graphics, animation);
}

function _style(graphic: IGraphic, params: IStyleParams) {
  const {
    styleFunc,
    startIndex,
    endIndex,
    style,
    stagger: { enable: staggerEnable, ratio: staggerRatio = 0.25 }
  } = params;
  const symbols = graphic.getChildren();
  const start = startIndex ?? 0;
  const end = endIndex ?? symbols.length - 1;
  symbols.forEach((symbol: ISymbol, index) => {
    const duration = staggerEnable ? params.duration * staggerRatio : params.duration;
    const delay = staggerEnable ? Math.random() * params.duration * (1 - staggerRatio) : 1;
    if (styleFunc) {
      symbol.animate().wait(delay).to(styleFunc(index), duration, params.easing);
    } else if (index >= start && index <= end && style) {
      symbol.animate().wait(delay).to(style, duration, params.easing);
    }
  });
}
