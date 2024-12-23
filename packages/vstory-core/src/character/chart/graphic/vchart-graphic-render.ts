import type {
  IContext2d,
  IDrawContext,
  IGraphicAttribute,
  IGraphicRender,
  IGraphicRenderDrawParams,
  IMarkAttribute,
  IRenderService,
  IThemeAttribute
} from '@visactor/vrender';
import { injectable, DefaultCanvasRectRender } from '@visactor/vrender';
import type { VChartGraphic } from './vchart-graphic';
import { CHART_NUMBER_TYPE } from './vchart-graphic';

export const ChartRender = Symbol.for('VStoryChartRender');
export const ChartRenderContribution = Symbol.for('VStoryChartRenderContribution');

@injectable()
export class VChartRender extends DefaultCanvasRectRender implements IGraphicRender {
  type: 'chart';
  numberType: number = CHART_NUMBER_TYPE;

  drawShape(
    chart: any,
    context: IContext2d,
    x: number,
    y: number,
    drawContext: IDrawContext,
    params?: IGraphicRenderDrawParams,
    fillCb?: (
      ctx: IContext2d,
      markAttribute: Partial<IMarkAttribute & IGraphicAttribute>,
      themeAttribute: IThemeAttribute
    ) => boolean,
    strokeCb?: (
      ctx: IContext2d,
      markAttribute: Partial<IMarkAttribute & IGraphicAttribute>,
      themeAttribute: IThemeAttribute
    ) => boolean
  ) {
    const { baseOpacity = 1 } = chart.attribute;
    if (baseOpacity <= 0) {
      return;
    }
    context.baseGlobalAlpha *= baseOpacity;
    super.drawShape(chart, context, x, y, drawContext, params, fillCb, strokeCb);
    // TODO 考虑一个通用的ctx清理逻辑
    if (context._clearFilterStyle && context.nativeContext) {
      context.nativeContext.filter = 'blur(0px)';
      context._clearFilterStyle = false;
    }
    context.baseGlobalAlpha /= baseOpacity;
    const vChart = (chart as VChartGraphic).vchart;
    const vchartStage = vChart.getStage();
    const vchartCtx = vchartStage.window.getContext();
    vchartCtx.baseGlobalAlpha *= baseOpacity;
    // @ts-ignore
    vchartStage._editor_needRender = true;
    const matrix = chart.globalTransMatrix.clone();
    // auto 模式下，需要将vchart.stage的viewBoxTransform 设置到包含偏移量的位置
    matrix.translate(chart.vchartAutoTranslate.x, chart.vchartAutoTranslate.y);
    const stageMatrix = chart.stage.window.getViewBoxTransform().clone();
    stageMatrix.multiply(matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f);
    vchartStage.window.setViewBoxTransform(
      stageMatrix.a,
      stageMatrix.b,
      stageMatrix.c,
      stageMatrix.d,
      stageMatrix.e,
      stageMatrix.f
    );
    vchartStage.dirtyBounds?.clear();
    vchartStage.render();
    vchartCtx.baseGlobalAlpha /= baseOpacity;
  }

  draw(chart: any, renderService: IRenderService, drawContext: IDrawContext, params?: IGraphicRenderDrawParams) {
    // const chartAttribute = getTheme(chart, params?.theme).circle;
    this._draw(chart, {} as any, false, drawContext, params);
  }
}
