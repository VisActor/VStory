import type { ISpec } from '@visactor/vchart';
import type VChart from '@visactor/vchart';
import type { IChartAppearAction } from '../../../../types/chart/appear';
import type { ICharacterVisactor } from '../../../../../story/character/visactor/interface';

import { axesDisappearProcessor, titleDisappearProcessor } from '../../components';
import { lineDisappearProcessor as lineMarkDisappearProcessor } from '../../marks';
import { graphicDisappearProcessor } from '../../../graphic/disappear';
import { commonDisappearByBaseOpacity } from '../common/commonDisappear';

export const lineDisappearProcessor = async (
  chartInstance: ICharacterVisactor,
  spec: ISpec,
  action: IChartAppearAction
) => {
  if (commonDisappearByBaseOpacity(chartInstance, spec, action)) {
    return;
  }
  const chart = chartInstance.getGraphicParent();
  const vchart = chart?._vchart;
  const instance: VChart = vchart ? vchart : chartInstance;

  if (!instance) {
    return;
  }

  lineMarkDisappearProcessor(chartInstance, spec, action);

  // 隐藏标题
  titleDisappearProcessor(chartInstance, spec, {
    action: 'disappear',
    payload: {
      animation: {
        duration: action.payload?.animation?.duration,
        easing: action.payload?.animation?.easing,
        effect: 'fade'
      }
    }
  });

  // 隐藏坐标轴
  axesDisappearProcessor(chartInstance, spec, { action: 'disappear', payload: undefined });

  // Group Disappear
  // @ts-ignore
  graphicDisappearProcessor(chartInstance, spec, action);

  // 隐藏group
  chart.setAttributes({
    visible: false
  });
};
