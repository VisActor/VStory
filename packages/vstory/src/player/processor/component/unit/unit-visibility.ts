import type { IGraphic, ISymbol } from '@visactor/vrender-core';
import type { ICharacter } from '../../../../story/character';
import { getCharacterByEffect } from '../../common/common';
import type { IStyleParams, ITypeWriterParams } from '../../interface/appear-action';
import { CommonVisibilityActionProcessor } from '../common-component';

export class UnitVisibilityActionProcessor extends CommonVisibilityActionProcessor {
  name: 'appearOrDisAppear';
  constructor() {
    super();
  }
}

function style(character: ICharacter, animation: ITypeWriterParams, effect: string) {
  const graphics = getCharacterByEffect(character, effect) as IGraphic[];
  graphics.forEach((graphic: any) => _style(graphic, animation as any));
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

export class UnitStyleActionProcessor extends CommonVisibilityActionProcessor {
  name: 'style';
  constructor() {
    super();
  }

  getEffectFunc(effect: string, appear: boolean) {
    switch (effect) {
      case 'style':
        return style;
    }
    return super.getEffectFunc(effect, appear);
  }
}
