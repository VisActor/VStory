import type { IGroup } from '@visactor/vrender-core';
import type { IVisactorGraphic } from '../../visactor/interface';
import { Bounds, type AABBBounds, type IAABBBounds, type IBoundsLike } from '@visactor/vutils';
import type { IInitOption, ISpec, IVChart } from '@visactor/vchart';
import type { GraphicType, IGroupGraphicAttribute, ITicker } from '@visactor/vrender';
import { genNumberType, Rect } from '@visactor/vrender';
import { isPointInBounds } from '../../../../util/space';
import { mergeChartOption } from '../../../utils/chart';

const VIEW_BOX_EXPEND = 4;

export interface IChartGraphicAttribute extends IGroupGraphicAttribute {
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

  getVChartActualBounds() {
    const stage = this._vchart.getStage();
    const layer = stage.defaultLayer;
    const root = stage.defaultLayer.getChildByName('root') as IGroup;
    const bounds = new Bounds();
    root.forEachChildren((child: IGroup) => {
      if (child.attribute.width || child.attribute.height) {
        child.forEachChildren((_child: IGroup) => {
          bounds.union(_child.AABBBounds);
        });
      } else {
        bounds.union(child.AABBBounds);
      }
    });
    bounds.translate(this.attribute.x + layer.attribute.x, this.attribute.y + layer.attribute.y);
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
    viewBox && this.updateViewBox(viewBox);
    this._vchart.updateSpecSync(spec, forceMerge, { reuse: false, morph: morphConfig });
    this._updateViewBox();
  }

  updateViewBox(viewBox: IBoundsLike) {
    // 图表的设置大小
    this._globalViewBox = { ...viewBox };
    this._localViewBox = { x1: 0, y1: 0, x2: viewBox.x2 - viewBox.x1, y2: viewBox.y2 - viewBox.y1 };

    this._updateViewBox();
  }

  private _updateViewBox() {
    if (!this._vchart) {
      return;
    }
    this._boundsChangeTag = true;
    this._vchart.resize(
      this._globalViewBox.x2 - this._globalViewBox.x1,
      this._globalViewBox.y2 - this._globalViewBox.y1
    );
    const rootBounds = this._getVChartBounds();
    this._vchart.getStage().defaultLayer.translateTo(-rootBounds.x1, -rootBounds.y1);
    this._BoundsViewBox = rootBounds;

    const viewBox = { ...this._globalViewBox };
    this.setAttributes({
      x: viewBox.x1 + rootBounds.x1,
      y: viewBox.y1 + rootBounds.y1,
      width: rootBounds.x2 - rootBounds.x1,
      height: rootBounds.y2 - rootBounds.y1
    });
    // viewBox 在展示 bounds 下的位置
    this._localViewBox.x1 = -rootBounds.x1;
    this._localViewBox.y1 = -rootBounds.y1;
    this._localViewBox.x2 += -rootBounds.x1;
    this._localViewBox.y2 += -rootBounds.y1;
    //
    viewBox.x2 -= viewBox.x1;
    viewBox.y2 -= viewBox.y1;
    viewBox.x1 = 0;
    viewBox.y1 = 0;
    // this._vchart.resize(viewBox.x2 - viewBox.x1, viewBox.y2 - viewBox.y1);
    this._vchart.updateViewBox(viewBox);
    const renderViewBox = { ...rootBounds };
    renderViewBox.x2 -= renderViewBox.x1;
    renderViewBox.y2 -= renderViewBox.y1;
    renderViewBox.x1 = 0;
    renderViewBox.y1 = 0;
    renderViewBox.x2 += VIEW_BOX_EXPEND;
    renderViewBox.y2 += VIEW_BOX_EXPEND;
    // @ts-ignore
    this._vchart._compiler._view.renderer.setViewBox(renderViewBox, true);
  }

  release() {
    this._vchart && this._vchart.release();
  }
}
