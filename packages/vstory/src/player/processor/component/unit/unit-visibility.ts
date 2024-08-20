import type { IGraphic, ISymbol } from '@visactor/vrender-core';
import type { ICharacter } from '../../../../story/character';
import { getCharacterByEffect } from '../../common/common';
import type { ITypeWriterParams } from '../../interface/appear-action';
import { CommonVisibilityActionProcessor } from '../common-component';

export class UnitVisibilityActionProcessor extends CommonVisibilityActionProcessor {
  name: 'appearOrDisAppear';
  constructor() {
    super();
  }
}

function restyle(character: ICharacter, animation: ITypeWriterParams, effect: string) {
  const graphics = getCharacterByEffect(character, effect) as IGraphic[];
  graphics.forEach((graphic: any) => _restyle(graphic, animation as any));
}

function _restyle(graphic: IGraphic, params: any) {
  const { styleFunc, start, end, style } = params;
  const symbols = graphic.getChildren();
  const startIndex = start ?? 0;
  const endIndex = end ?? symbols.length - 1;
  symbols.forEach((symbol: ISymbol, index) => {
    if (styleFunc) {
      symbol.animate().to(styleFunc(index), params.duration, params.easing);
    } else {
      if (index >= startIndex && index <= endIndex) {
        if (style) {
          symbol.animate().to(style, params.duration, params.easing);
        }
      }
    }
  });
}

export class UnitRestyleActionProcessor extends CommonVisibilityActionProcessor {
  name: 'restyle';
  constructor() {
    super();
  }

  getEffectFunc(effect: string, appear: boolean) {
    switch (effect) {
      case 'restyle':
        return restyle;
    }
    return super.getEffectFunc(effect, appear);
  }
}
