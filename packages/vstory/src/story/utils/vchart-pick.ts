import type { IGraphic, IGraphicAttribute } from '@visactor/vrender';
import type { IVChart } from '@visactor/vchart';
import type { StoryEvent } from '../interface/runtime-interface';

export interface IPickModelInfo {
  type: string;
  model: any;
  specKey: string;
  specIndex: number;
  datum?: any;
  mark?: any;
}

function commonModelInfo(model: any) {
  return {
    type: model.type,
    model,
    specKey: model.specKey,
    specIndex: model.getSpecIndex()
  };
}

export const seriesMarkPick = {
  check: (graphic: IGraphic, graphicPath: IGraphic[]) => {
    return graphic.name?.startsWith('seriesGroup_');
  },
  modelInfo: (chart: IVChart, graphic: IGraphic, graphicPath: IGraphic[], index: number) => {
    const nameInfo = graphic.name.split('_');
    const seriesId = +nameInfo[2];
    const markGraphic = graphicPath[index + 1];
    const markId = +markGraphic.name.split('_')[1];
    const series = chart.getChart().getSeriesInIds([seriesId])[0];
    const datum = graphicPath[graphicPath.length - 1].__vgrammar_scene_item__.data;
    return {
      type: 'seriesMark',
      model: series,
      mark: series.getMarkInId(markId),
      specKey: series.specKey,
      specIndex: series.getSpecIndex(),
      datum
    };
  }
};

export const axisMarkPick = {
  check: (graphic: IGraphic, graphicPath: IGraphic[]) => {
    return graphic.name === 'axis' || graphic.name === 'axis-grid';
  },
  modelInfo: (chart: IVChart, graphic: IGraphic, graphicPath: IGraphic[], index: number) => {
    const axisModel = chart
      .getChart()
      .getAllComponents()
      // @ts-ignore
      .filter(c => c.specKey === 'axes');
    let axisGraphic = graphicPath.find(g => g.name === 'axis');
    if (axisGraphic) {
      // @ts-ignore
      const axis = axisModel.find(a => a._axisMark && a._axisMark.getProduct().graphicItem === axisGraphic.parent);
      if (axis) {
        return commonModelInfo(axis);
      }
    }
    axisGraphic = graphicPath.find(g => g.name === 'axis-grid');
    if (axisGraphic) {
      // @ts-ignore
      const axis = axisModel.find(a => a._gridMark && a._gridMark.getProduct().graphicItem === axisGraphic.parent);
      if (axis) {
        return commonModelInfo(axis);
      }
    }
    return null;
  }
};

const MarkerClassName: { [key: string]: boolean } = {
  MarkLine: true,
  MarkArea: true,
  MarkPoint: true,
  MarkArcLine: true,
  MarkArcArea: true
};

const MarkerIdPrefix: { [key: string]: boolean } = {
  markPoint: true,
  markLine: true,
  markArea: true
};

export const markerMarkPick = {
  check: (graphic: IGraphic, graphicPath: IGraphic[]) => {
    return !!MarkerClassName[graphic.constructor.name];
  },
  modelInfo: (chart: IVChart, graphic: IGraphic, graphicPath: IGraphic[]) => {
    const split = (<string>graphic.id).split('-');
    const idPrefix = split[0];
    let model;
    if (MarkerIdPrefix[idPrefix]) {
      const markerId = +(<string>graphic.id).split('-')[1];
      model = chart
        .getChart()
        .getAllComponents()
        // @ts-ignore
        .find(c => c.id === markerId);
    } else {
      const markerUserId = graphic.id;
      model = chart
        .getChart()
        .getAllComponents()
        // @ts-ignore
        .find(c => c.userId === markerUserId);
    }
    return commonModelInfo(model);
  }
};

export const labelMarkPick = {
  check: (graphic: IGraphic, graphicPath: IGraphic[]) => {
    return graphic.name === 'data-label';
  },
  modelInfo: (chart: IVChart, graphic: IGraphic, graphicPath: IGraphic[], index: number) => {
    const id = +graphicPath[index - 1].name.split('_')[1];
    const model = chart
      .getChart()
      .getAllComponents()
      // @ts-ignore
      .find(c => {
        if (c.type !== 'label' && c.type !== 'totalLabel') {
          return false;
        }
        return c.getMarks().some(m => m.id === id);
      });
    // @ts-ignore
    return { ...commonModelInfo(model), datum: graphicPath[graphicPath.length - 1].attribute.data };
  }
};

function commonModePick(vrenderGraphicClassName: string, modelName: string) {
  return {
    check: (graphic: IGraphic, graphicPath: IGraphic[]) => {
      return graphic.constructor.name === vrenderGraphicClassName;
    },
    modelInfo: (chart: IVChart, graphic: IGraphic, graphicPath: IGraphic[], index: number) => {
      return commonModelInfo(
        chart
          .getChart()
          .getAllComponents()
          // @ts-ignore
          .find(c => c.type === modelName)
      );
    }
  };
}

export const discreteLegendMarkPick = commonModePick('DiscreteLegend', 'discreteLegend');
export const colorLegendMarkPick = commonModePick('ColorContinuousLegend', 'colorLegend');
export const sizeLegendMarkPick = commonModePick('SizeContinuousLegend', 'sizeLegend');
export const scrollBarMarkPick = commonModePick('ScrollBar', 'scrollBar');
export const titleBarMarkPick = commonModePick('Title', 'title');
export const continuousPlayerMarkPick = commonModePick('ContinuousPlayer', 'player');
export const discretePlayerMarkPick = commonModePick('DiscretePlayer', 'player');

const modelCheck: {
  check: (graphic: IGraphic, graphicPath: IGraphic[]) => boolean;
  modelInfo: (chart: IVChart, graphic: IGraphic, graphicPath: IGraphic[], index: number) => any;
}[] = [
  seriesMarkPick,
  axisMarkPick,
  discreteLegendMarkPick,
  colorLegendMarkPick,
  sizeLegendMarkPick,
  markerMarkPick,
  scrollBarMarkPick,
  labelMarkPick,
  titleBarMarkPick,
  continuousPlayerMarkPick,
  discretePlayerMarkPick
];

/**
 * 从event属性上，读取当前pick到的图表模块内容
 * @param event
 */
export function getChartModelWithEvent(chart: IVChart, event: StoryEvent) {
  const graphicPath = event.detailPath[event.detailPath.length - 1] as unknown as IGraphic<
    Partial<IGraphicAttribute>
  >[];
  if (!graphicPath) {
    return null;
  }
  const pickGraphic = graphicPath?.[graphicPath.length - 1];
  if (!pickGraphic) {
    return null;
  }
  return getGraphicModelMark(chart, pickGraphic, graphicPath, 0);
}

export function getGraphicModelMark(
  chart: IVChart,
  graphic: IGraphic,
  graphicPath: IGraphic[],
  index: number
): IPickModelInfo {
  if (!graphic) {
    return null;
  }
  if (graphic.layer !== chart.getStage().defaultLayer) {
    return null;
  }
  const modelPick = modelCheck.find(mc => mc.check(graphic, graphicPath));
  if (modelPick) {
    return modelPick.modelInfo(chart, graphic, graphicPath, index);
  }
  // @ts-ignore
  if (index >= graphicPath.length - 1) {
    return null;
  }

  return getGraphicModelMark(chart, graphicPath[index + 1], graphicPath, index + 1);
}
