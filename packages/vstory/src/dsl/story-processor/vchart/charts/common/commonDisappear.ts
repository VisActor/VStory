import type { ISpec } from '@visactor/vchart';
// eslint-disable-next-line no-duplicate-imports
import type VChart from '@visactor/vchart';
import type { IChartAppearAction } from '../../../../types/chart/appear';
import type { ICharacterVisactor } from '../../../../../story/character/visactor/interface';

import { graphicDisappearProcessor } from '../../../graphic/disappear';
import { axesDisappearProcessor } from '../../components';
import {
  lineDisappearProcessor as lineMarkDisappearProcessor,
  areaDisappearProcessor as areaMarkDisappearProcessor
} from '../../marks';
import type { EasingType } from '@visactor/vrender-core';

export const commonDisappearProcessor = async (
  chartInstance: ICharacterVisactor,
  spec: ISpec,
  action: IChartAppearAction
) => {
  const chart = chartInstance.getGraphicParent();
  const vchart = chart?._vchart;
  const instance: VChart = vchart ? vchart : chartInstance;

  if (!instance) {
    return;
  }

  lineMarkDisappearProcessor(chartInstance, spec, action);

  areaMarkDisappearProcessor(chartInstance, spec, action);
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
export const commonDisappearByBaseOpacity = (
  chartInstance: ICharacterVisactor,
  spec: ISpec,
  action: IChartAppearAction
) => {
  const chart = chartInstance.getGraphicParent();
  const vchart = chart?._vchart;
  const instance: VChart = vchart ? vchart : chartInstance;

  if (!instance) {
    return;
  }

  const duration = action.payload.animation?.duration;
  const easing = action.payload.animation?.easing;

  if (action.payload.fade?.isBaseOpacity) {
    chart.setAttributes({
      baseOpacity: 1
    });

    chart.animate().to({ baseOpacity: 0 }, duration, easing as EasingType);
    return true;
  }
  return false;
};
