import type { IGroup } from '@visactor/vrender-core';
import type { IVisactorGraphic } from '../../visactor/interface';
import { Bounds, type AABBBounds, type IAABBBounds, type IBoundsLike } from '@visactor/vutils';
import type { IInitOption, ISpec, IVChart } from '@visactor/vchart';
import { isPointInBounds, isBoundsLikeEqual } from '../../../../util/space';
import type { GraphicType, IGraphicAttribute, ITicker, IGraphic } from '@visactor/vrender';
import { genNumberType, Rect } from '@visactor/vrender';
import { mergeChartOption } from '../../../utils/chart';

const VIEW_BOX_EXPEND = 4;

export interface IChartGraphicAttribute extends IGraphicAttribute {
  renderCanvas: HTMLCanvasElement;
  spec: any;
  ClassType: any;
  vchart: IVChart;
  mode: IInitOption['mode'];
  modeParams?: any;
  dpr: number;
  interactive: boolean;
  animation: boolean;
  disableTriggerEvent: boolean;
  disableDirtyBounds: boolean;
  viewBox: IBoundsLike;
  ticker?: ITicker;
  autoRender?: boolean;
  chartInitOptions?: any;
  enablePickBounds?: boolean;
  width: number;
  height: number;
}

export const CHART_NUMBER_TYPE = genNumberType();

// @ts-ignore
export class Chart extends Rect implements IVisactorGraphic {
  type: GraphicType = 'chart' as any;
  declare attribute: IChartGraphicAttribute;
  protected _vchart: IVChart;
  // 是否试一次空render，目的是只生成场景树，不会真实渲染
  // protected _emptyRenderCall: boolean;
  protected declare _AABBBounds: AABBBounds;
  declare valid: boolean;
  get vchart() {
    return this._vchart;
  }
  get vProduct() {
    return this._vchart;
  }

  // 设置的 viewBox 是全局值
  private _globalViewBox: IBoundsLike = { x1: 0, y1: 0, x2: 100, y2: 100 };
  // 设置的 viewBox 相对于 vchart-graphic 的位置
  private _localViewBox: IBoundsLike = { x1: 0, y1: 0, x2: 100, y2: 100 };
  private _BoundsViewBox: IBoundsLike = { x1: 0, y1: 0, x2: 100, y2: 100 };

  drawTag = false;
  protected _boundsChangeTag: boolean = true;

  private _getVChartBounds() {
    const stage = this._vchart.getStage();
    return stage.defaultLayer.getChildByName('root').AABBBounds.clone();
  }

  private _getGroupActualBounds(bounds: Bounds, _group: IGraphic) {
    if (_group.type !== 'group') {
      bounds.union(_group.globalAABBBounds);
      return;
    }
    // 以下是 group 的情况
    const group = _group as IGroup;
    if (group.childrenCount === 0) {
      return;
    }
    if (group.name?.startsWith('seriesGroup_')) {
      return bounds.union(group.globalAABBBounds);
    }
    if (group.attribute.clip === true && (group.attribute.width || group.attribute.height)) {
      bounds.union(group.globalAABBBounds);
      return;
    }
    group.forEachChildren(_child => {
      this._getGroupActualBounds(bounds, _child as IGraphic);
    });
  }

  getVChartActualBounds() {
    const stage = this._vchart.getStage();
    // const layer = stage.defaultLayer;
    const root = stage.defaultLayer.getChildByName('root') as IGroup;
    const bounds = new Bounds();
    root.forEachChildren((child: IGroup) => {
      this._getGroupActualBounds(bounds, child);
    });
    bounds.translate(this.attribute.x, this.attribute.y);
    return bounds;
  }

  doUpdateAABBBounds(full?: boolean): IAABBBounds {
    if (!this._vchart) {
      return super.doUpdateAABBBounds();
    }
    const b = new Bounds();
    b.x1 = this.attribute.x;
    b.x2 = this.attribute.x + this.attribute.width;
    b.y1 = this.attribute.y;
    b.y2 = this.attribute.y + this.attribute.height;
    return b;
  }

  constructor(params: IChartGraphicAttribute) {
    super(params);
    this.numberType = CHART_NUMBER_TYPE;

    // 创建chart
    if (!params.vchart) {
      params.vchart = this._vchart = new params.ClassType(
        params.spec,
        mergeChartOption(
          {
            renderCanvas: params.renderCanvas,
            mode: params.mode,
            modeParams: params.modeParams,
            canvasControled: false,
            // viewBox: params.vi
            dpr: params.dpr,
            interactive: params.interactive,
            animation: false,
            autoFit: false,
            disableTriggerEvent: params.disableTriggerEvent,
            disableDirtyBounds: params.disableDirtyBounds,
            // @ts-ignore
            ticker: params.ticker,
            beforeRender: () => {
              if (!this.stage) {
                return;
              }
              const chartStage = this._vchart.getStage();
              if (!(chartStage as any)._editor_needRender) {
                chartStage.pauseRender();
                this.stage.dirtyBounds?.union(this.globalAABBBounds);
                this.stage.renderNextFrame();
              }
            },
            afterRender: () => {
              if (!this._vchart) {
                return;
              }
              if (!this.stage) {
                return;
              }
              // @ts-ignore
              this._vchart.getStage()._editor_needRender = false;
              this._vchart.getStage().stage.resumeRender();
            }
          },
          params.chartInitOptions ?? {}
        )
      );
    } else {
      this._vchart = params.vchart;
    }

    // 背景设置为false后，不会擦除画布内容，可以实现元素正常堆叠绘制
    const stage = this._vchart.getStage();
    stage.stage.pauseRender();
    this._vchart.renderSync();
    stage.stage.resumeRender();
    if (stage) {
      stage.background = false as any;
      // 关闭交互
      // stage.pauseTriggerEvent();
    }
    if (params.viewBox) {
      this.updateViewBox(params.viewBox);
    }
  }

  /**
   * 判定点是否在VChart中，可能点在Character里，但不在VChart里
   * @param canvasX
   * @param canvasY
   */
  pointInVChart(canvasX: number, canvasY: number): boolean {
    const vchart = this._vchart;
    if (!vchart) {
      return false;
    }
    const target = { x: 0, y: 0 };
    this.globalTransMatrix.transformPoint({ x: canvasX, y: canvasY }, target);
    // 判断点是否在viewBox中
    return isPointInBounds(target, vchart.getStage().viewBox);
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
    this._vchart.updateSpecSync(spec, forceMerge, { reuse: false, morph: morphConfig });
    if (this._BoundsViewBox) {
      const rootBounds = this._getVChartBounds();
      if (isBoundsLikeEqual(rootBounds, this._BoundsViewBox)) {
        return;
      }
    }
    this._updateViewBox();
  }

  private _setGlobalViewBox(viewBox: IBoundsLike) {
    if (this._globalAABBBounds && isBoundsLikeEqual(this._globalAABBBounds, viewBox)) {
      // 尺寸没变化
      return false;
    }
    // 图表的设置大小
    this._globalViewBox = { ...viewBox };
    this._localViewBox = { x1: 0, y1: 0, x2: viewBox.x2 - viewBox.x1, y2: viewBox.y2 - viewBox.y1 };
    return true;
  }

  updateViewBox(viewBox: IBoundsLike) {
    if (!this._setGlobalViewBox(viewBox)) {
      return;
    }
    this._updateViewBox();
  }

  private _updateViewBox() {
    if (!this._vchart) {
      return;
    }
    this._boundsChangeTag = true;
    const rect = this._vchart.getChart().getCanvasRect();
    // 只有当尺寸变化时才resize
    if (
      rect.width !== this._globalViewBox.x2 - this._globalViewBox.x1 ||
      rect.height !== this._globalViewBox.y2 - this._globalViewBox.y1
    ) {
      this._vchart.resize(
        this._globalViewBox.x2 - this._globalViewBox.x1,
        this._globalViewBox.y2 - this._globalViewBox.y1
      );
    }
    const rootBounds = this._getVChartBounds().expand(VIEW_BOX_EXPEND);
    this.setAttributes({
      x: this._globalViewBox.x1 + rootBounds.x1,
      y: this._globalViewBox.y1 + rootBounds.y1,
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
  }
}
