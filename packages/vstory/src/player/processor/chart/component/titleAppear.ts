import { TypeWriter } from '../../../../animate/typewirter';
import type { IChartAppearAction } from '../../interface/appear-action';
import { commonFade, commonGrow } from './commonAppear';
import { typewriter as textTypeWriter } from '../../../../dsl/story-processor/graphic/effect/typewriter';

import type { IGroup, IText } from '@visactor/vrender-core';
import { isArray } from '@visactor/vutils';

export const runTitleAppear = (
  instance: IGroup,
  animation: IChartAppearAction['payload']['animation'],
  option: { disappear: boolean }
) => {
  switch (animation.effect) {
    case 'grow': {
      return commonGrow(instance, animation, option);
    }
    case 'fade': {
      return commonFade(instance, animation, option);
    }

    default: {
      return commonFade(instance, animation, option);
    }
  }
};
