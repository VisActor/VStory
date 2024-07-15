import type { ISpec } from '@visactor/vchart';
import type VChart from '@visactor/vchart';
import type { IChartAppearAction } from '../../../../types/chart/appear';
import type { ICharacterVisactor } from '../../../../../story/character/visactor/interface';
import { axesDisappearProcessor, titleDisappearProcessor } from '../../components';
import { symbolDisappearProcessor } from '../../marks';
import { graphicDisappearProcessor } from '../../../graphic/disappear';
import { commonDisappearByBaseOpacity } from '../common/commonDisappear';

export const scatterDisappearProcessor = async (
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

  // 隐藏: symbol
  symbolDisappearProcessor(chartInstance, spec, action);

  // 隐藏: 标题
  titleDisappearProcessor(chartInstance, spec, {
    action: 'disappear',
    payload: {
      animation: {
        duration: action.payload.animation.duration,
        easing: action.payload.animation.easing,
        effect: 'fade'
      }
    }
  });

  // 隐藏: 坐标轴
  axesDisappearProcessor(chartInstance, spec, { action: 'disappear', payload: undefined });

  // Group Disappear
  // @ts-ignore
  graphicDisappearProcessor(chartInstance, spec, action);

  // 隐藏: 根节点容器
  chart.setAttributes({
    visible: false
  });
};
