import type { ISpec } from '@visactor/vchart';
import type VChart from '@visactor/vchart';
import type { IChartAppearAction } from '../../../../types/chart/appear';
import type { ICharacterVisactor } from '../../../../../story/character/visactor/interface';

import { axesDisappearProcessor, titleDisappearProcessor } from '../../components';
import { rectDisappearProcessor } from '../../marks';
import { graphicDisappearProcessor } from '../../../graphic/disappear';
import { commonDisappearByBaseOpacity } from '../common/commonDisappear';

export const barDisappearProcessor = async (
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

  // 隐藏: rect图元
  rectDisappearProcessor(chartInstance, spec, action);

  // 隐藏: title图元
  titleDisappearProcessor(chartInstance, spec, {
    action: 'disappear',
    payload: {
      animation: {
        effect: 'fade',
        duration: action.payload.animation.duration,
        easing: action.payload.animation.easing
      }
    }
  });

  // Group Disappear
  // @ts-ignore
  graphicDisappearProcessor(chartInstance, spec, action);

  // 隐藏: 坐标轴
  axesDisappearProcessor(chartInstance, spec, { action: 'disappear', payload: undefined });

  // 隐藏: 根节点容器
  chart.setAttributes({
    visible: false
  });
};
