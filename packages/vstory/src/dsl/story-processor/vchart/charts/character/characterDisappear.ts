import VChart, { ISpec } from '@visactor/vchart';
import { IChartAppearAction } from '../../../../types/chart/appear';
import { ICharacterVisactor } from '../../../../../story/character/visactor/interface';
import { graphicDisappearProcessor } from '../../../graphic/disappear';

export const characterDisappearProcessor = async (
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
  // Group Disappear
  // @ts-ignore
  graphicDisappearProcessor(chartInstance, spec, action);

  // 隐藏group
  chart.setAttributes({
    visible: false
  });
};
