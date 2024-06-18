import type { VChart, ISpec } from '@visactor/vchart';
import type { IChartAppearAction } from '../../../../types/chart/appear';
import type { ICharacterVisactor } from '../../../../../story/character/visactor/interface';
import { graphicAppearProcessor } from '../../../graphic/appear';
import { appearEffectMap } from '../../../graphic/effect/appear';

export const characterAppearProcessor = async (
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

  const { animation } = action.payload ?? {};
  const { effect } = animation ?? {};

  const effects = effect && appearEffectMap[effect] ? [effect] : Object.keys(appearEffectMap);

  effects.forEach(effect => {
    instance
      .getChart()
      .getAllMarks()
      .forEach(mark => {
        const product = mark.getProduct();
        if (product) {
          const graphic = product.getGroupGraphicItem();
          const appearEffect = appearEffectMap[effect];
          appearEffect(graphic, animation);
        }
      });
  });
};
