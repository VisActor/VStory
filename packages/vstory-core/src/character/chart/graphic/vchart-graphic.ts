import type { IInitOption, ISpec, IVChart } from '@visactor/vchart';
import VChart from '@visactor/vchart';
import type { GraphicType, IRectGraphicAttribute, ITicker } from '@visactor/vrender-core';
import { genNumberType, IGraphicAttribute, Rect } from '@visactor/vrender-core';
import type { IBoundsLike } from '@visactor/vutils';
import { pointInAABB } from '@visactor/vutils';
import { mergeChartOption } from '../../../utils/chart';

export interface IChartGraphicAttribute {
  renderCanvas: HTMLCanvasElement;
  spec: any;
  // ClassType: any;
  vchart?: IVChart;
  mode?: IInitOption['mode'];
  modeParams?: any;
  dpr: number;
  interactive?: boolean;
  animation?: boolean;
  disableTriggerEvent: boolean;
  disableDirtyBounds: boolean;
  viewBox: IBoundsLike;
  ticker?: ITicker;
  autoRender?: boolean;
  chartInitOptions?: any;
  enablePickBounds?: boolean;
  width: number;
  height: number;
  x?: number;
  y?: number;
  angle?: number;
  anchor?: [number, number];
  zIndex?: number;
  panel?: Partial<IRectGraphicAttribute>;
}

export const CHART_NUMBER_TYPE = genNumberType();

export class VChartGraphic extends Rect {
  type: GraphicType = 'chart' as any;
  declare attribute: IChartGraphicAttribute;
  protected _vchart: IVChart;

  get vchart() {
    return this._vchart;
  }

  protected _boundsChangeTag: boolean = true;

  constructor(params: IChartGraphicAttribute) {
    const { panel, zIndex } = params;
    super({ ...(panel || {}), zIndex, visible: false });
    this.numberType = CHART_NUMBER_TYPE;
    // 创建chart
    const {
      spec,
      renderCanvas,
      mode,
      modeParams,
      dpr,
      interactive,
      disableTriggerEvent,
      disableDirtyBounds,
      ticker,
      chartInitOptions,
      viewBox
    } = params;
    this._vchart = new VChart(
      spec,
      mergeChartOption(
        {
          renderCanvas,
          mode,
          modeParams,
          canvasControled: false,
          viewBox,
          dpr,
          interactive,
          // animation: false,
          autoFit: false,
          disableTriggerEvent,
          disableDirtyBounds,
          // @ts-ignore
          ticker,
          // 只有vstory触发的render才会真的render
          beforeRender: stage => {
            const chartStage = this._vchart.getStage();
            if (!(chartStage as any)._editor_needRender) {
              chartStage.pauseRender();
              stage.dirtyBounds?.union(this.globalAABBBounds);
              stage.renderNextFrame();
            }
          },
          afterRender: stage => {
            // @ts-ignore
            stage._editor_needRender = false;
            stage.resumeRender();
          }
        },
        chartInitOptions ?? {}
      )
    );

    // 背景设置为false后，不会擦除画布内容，可以实现元素正常堆叠绘制
    const stage = this._vchart.getStage();
    // TODO stage的pauseRender支持传入count
    (stage as any)._skipRender = -Infinity;
    this._vchart.renderSync();
    if (stage) {
      stage.background = false as any;
      // 关闭交互
      // stage.pauseTriggerEvent();
    }
    stage.resumeRender();
  }

  /**
   * 判定点是否在设置 viewBox 内。设置 viewBox 会小于展示 bounds
   * @param canvasX
   * @param canvasY
   */
  pointInViewBox(canvasX: number, canvasY: number): boolean {
    const target = { x: 0, y: 0 };
    this.globalTransMatrix.transformPoint({ x: canvasX, y: canvasY }, target);
    return pointInAABB(target, this._vchart.getStage().viewBox);
  }

  release() {
    this._vchart && this._vchart.release();
    super.release();
  }
}
