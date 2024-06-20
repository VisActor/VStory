import type { ISpec } from '@visactor/vchart';
import type VChart from '@visactor/vchart';
import { getAllSeriesMarksWithoutRoot } from '../../../../util/vchart-api';
import { isDatumEqual } from '../../../utils/datum';
import { isValid } from '@visactor/vutils';
import type { IChartStyleAction } from '../../../types/chart/style';

export const lineStyleProcessor = async (chartInstance: VChart, spec: ISpec, updateStyleAction: IChartStyleAction) => {
  const action = updateStyleAction as IChartStyleAction;
  const { payload } = action;

  const encodeHelper = (attribute: string) => {
    return (_: any, element: any) => {
      if (element.data.some((d: any) => isDatumEqual(d, action.payload.data)) && isValid(payload?.[attribute])) {
        return payload[attribute];
      }

      return element.graphicItem.attribute?.[attribute];
    };
  };

  if (chartInstance) {
    const marks = getAllSeriesMarksWithoutRoot(chartInstance).filter(mark => mark.type === 'line');
    if (!marks.length) {
      return;
    }

    const attrs = Object.keys(action.payload);
    marks.forEach(mark => {
      mark.getProduct().encode(
        attrs.reduce<any>((res, attr: string) => {
          res[attr] = encodeHelper(attr);
          return res;
        }, {})
      );
      mark.getProduct();
    });

    chartInstance.renderSync();
  }
};
