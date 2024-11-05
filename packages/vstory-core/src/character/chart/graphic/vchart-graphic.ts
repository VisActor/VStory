import type { IInitOption, ISpec, IVChart } from '@visactor/vchart';
import VChart from '@visactor/vchart';
import type { GraphicType, IRectGraphicAttribute, ITicker } from '@visactor/vrender-core';
import { genNumberType, IGraphicAttribute, Rect } from '@visactor/vrender-core';
import type { IBoundsLike } from '@visactor/vutils';
import { isNumberClose } from '@visactor/vutils';
import { mergeChartOption } from '../../../utils/chart';
import { isBoundsLikeEqual, isPointInBounds } from '../../../utils/space';

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
  // 设置的 viewBox 是全局值
  private _globalViewBox: IBoundsLike = { x1: 0, y1: 0, x2: 100, y2: 100 };
  // 设置的 viewBox 相对于 vchart-graphic 的位置
  private _localViewBox: IBoundsLike = { x1: 0, y1: 0, x2: 100, y2: 100 };
  private _BoundsViewBox: IBoundsLike = { x1: 0, y1: 0, x2: 100, y2: 100 };

  constructor(params: IChartGraphicAttribute) {
    const { panel } = params;
    super({ ...(panel || {}), visible: false });
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
          // viewBox: params.vi
          dpr,
          interactive,
          animation: false,
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
    if (viewBox) {
      this.updateViewBox(viewBox);
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
    return isPointInBounds(target, this._localViewBox);
  }

  updateSpec(spec: ISpec, viewBox?: IBoundsLike, forceMerge = false, morphConfig = false) {
    this._boundsChangeTag = true;
    // 如果有新的viewBox
    if (viewBox) {
      this._setGlobalViewBox(viewBox);
    }
    if (this._globalViewBox) {
      spec.width = this._globalViewBox.x2 - this._globalViewBox.x1;
      spec.height = this._globalViewBox.y2 - this._globalViewBox.y1;
    }
    this._vchart.updateSpecSync(spec, forceMerge, { reuse: false, morph: morphConfig }, { reMake: true, change: true });
    if (this._BoundsViewBox) {
      const rootBounds = this._getVChartBounds();
      if (isBoundsLikeEqual(rootBounds, this._BoundsViewBox)) {
        return;
      }
    }
    this._updateViewBox();
  }

  private _setGlobalViewBox(viewBox: IBoundsLike) {
    if (this._globalViewBox && isBoundsLikeEqual(this._globalViewBox, viewBox)) {
      // 尺寸没变化
      return false;
    }
    // 图表的设置大小
    this._globalViewBox = { ...viewBox };
    this._localViewBox = { x1: 0, y1: 0, x2: viewBox.x2 - viewBox.x1, y2: viewBox.y2 - viewBox.y1 };
    return true;
  }

  protected updateViewBox(viewBox: IBoundsLike) {
    if (!this._setGlobalViewBox(viewBox)) {
      return;
    }
    this._updateViewBox();
  }

  protected _getVChartBounds() {
    const stage = this._vchart.getStage();
    return stage.defaultLayer.getChildByName('root').AABBBounds.clone();
  }

  protected _updateViewBox() {
    if (!this._vchart) {
      return;
    }
    this._boundsChangeTag = true;
    const rect = this._vchart.getChart().getCanvasRect();
    // 只有当尺寸变化时才resize
    if (
      !(
        isNumberClose(rect.width, this._globalViewBox.x2 - this._globalViewBox.x1) &&
        isNumberClose(rect.height, this._globalViewBox.y2 - this._globalViewBox.y1)
      )
    ) {
      (this._vchart as any).resizeSync(
        this._globalViewBox.x2 - this._globalViewBox.x1,
        this._globalViewBox.y2 - this._globalViewBox.y1
      );
    }
    const rootBounds = this._getVChartBounds().expand(0);
    // 先更新位置
    this.setAttributes({
      // x: this._globalViewBox.x1 + rootBounds.x1,
      // y: this._globalViewBox.y1 + rootBounds.y1,
      // @ts-ignore
      width: rootBounds.x2 - rootBounds.x1,
      height: rootBounds.y2 - rootBounds.y1
    });

    // 如果 图表bounds 没有变化，则不更新
    if (this._BoundsViewBox && isBoundsLikeEqual(rootBounds, this._BoundsViewBox)) {
      return;
    }

    this._vchart.getStage().defaultLayer.translateTo(-rootBounds.x1, -rootBounds.y1);
    this._BoundsViewBox = rootBounds;

    // viewBox 在展示 bounds 下的位置
    this._localViewBox.x1 = -rootBounds.x1;
    this._localViewBox.y1 = -rootBounds.y1;
    this._localViewBox.x2 += -rootBounds.x1;
    this._localViewBox.y2 += -rootBounds.y1;

    const renderViewBox = { ...rootBounds };
    renderViewBox.x2 -= renderViewBox.x1;
    renderViewBox.y2 -= renderViewBox.y1;
    renderViewBox.x1 = 0;
    renderViewBox.y1 = 0;
    // 这个时候需要改的是vrender的viewBox
    // @ts-ignore
    this._vchart._compiler._view.renderer.setViewBox(renderViewBox, true);
  }

  release() {
    this._vchart && this._vchart.release();
    super.release();
  }
}
