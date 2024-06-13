import type { ISpec } from '@visactor/vchart';
import type { IChartAppearAction } from '../../../../types/chart/appear';
import type { ICharacterVisactor } from '../../../../../story/character/visactor/interface';
import { graphicAppearProcessor } from '../../../graphic/appear';

export const commonAppearProcessor = async (
  chartInstance: ICharacterVisactor,
  spec: ISpec,
  action: IChartAppearAction
) => {
  // Group Appear
  delete action.payload.animation.effect;
  graphicAppearProcessor(chartInstance, spec, action);
};
