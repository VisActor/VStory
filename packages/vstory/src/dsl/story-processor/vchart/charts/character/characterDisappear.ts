import type { ISpec } from '@visactor/vchart';
import type VChart from '@visactor/vchart';
import type { IChartAppearAction } from '../../../../types/chart/appear';
import type { ICharacterVisactor } from '../../../../../story/character/visactor/interface';
import { graphicDisappearProcessor } from '../../../graphic/disappear';
import { commonDisappearByBaseOpacity } from '../common/commonDisappear';

export const characterDisappearProcessor = async (
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
  // Group Disappear
  // @ts-ignore
  graphicDisappearProcessor(chartInstance, spec, action);

  // 隐藏group
  chart.setAttributes({
    visible: false
  });
};
