import type { IVisactorGraphic } from '../../visactor/interface';
import type { IBoundsLike } from '@visactor/vutils';
import type { ISpec, IVChart } from '@visactor/vchart';
import type { GraphicType, IGroupGraphicAttribute, ITicker } from '@visactor/vrender';
import { genNumberType, Group } from '@visactor/vrender';
import { isPointInBounds } from '../../../../util/space';

export interface IChartGraphicAttribute extends IGroupGraphicAttribute {
  renderCanvas: HTMLCanvasElement;
  spec: any;
  ClassType: any;
  vchart: IVChart;
  mode: string;
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
export class Chart extends Group implements IVisactorGraphic {
  type: GraphicType = 'chart' as any;
  declare attribute: IChartGraphicAttribute;
  protected _vchart: IVChart;
  // 是否试一次空render，目的是只生成场景树，不会真实渲染
  // protected _emptyRenderCall: boolean;
  get vchart() {
    return this._vchart;
  }
  get vProduct() {
    return this._vchart;
  }

  drawTag = false;

  constructor(params: IChartGraphicAttribute) {
    super(params);
    this.numberType = CHART_NUMBER_TYPE;

    // 创建chart
    if (!params.vchart) {
      params.vchart = this._vchart = new params.ClassType(params.spec, {
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
        },
        ...(params.chartInitOptions ?? {})
      });
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
      stage.pauseTriggerEvent();
    }
    if (params.viewBox) {
      const x1 = params.viewBox.x1 ?? 0;
      const y1 = params.viewBox.y1 ?? 0;
      const x2 = params.viewBox.x2 ?? 0;
      const y2 = params.viewBox.y2 ?? 0;
      this.setAttributes({
        x: x1,
        y: y1,
        width: x2 - x1,
        height: y2 - y1
      });
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

  setAttributes(attrs: Partial<IChartGraphicAttribute>) {
    super.setAttributes(attrs);
    const vchart = this._vchart;
    const viewBox = vchart.getStage().viewBox;

    const x1 = attrs.x ?? viewBox.x1;
    const y1 = attrs.y ?? viewBox.y1;
    const width = attrs.width ?? viewBox.width();
    const height = attrs.height ?? viewBox.height();
    this.updateViewBox({
      x1,
      y1,
      x2: x1 + width,
      y2: y1 + height
    });
  }

  updateSpec(spec: ISpec, forceMerge = false, morphConfig = false) {
    this._vchart.updateSpecSync(spec, forceMerge, morphConfig as any);
  }

  protected updateViewBox(viewBox: IBoundsLike) {
    this._updateViewBox(viewBox);
  }

  private _updateViewBox(_viewBox: IBoundsLike) {
    const viewBox = { ..._viewBox };
    //
    viewBox.x2 -= viewBox.x1;
    viewBox.y2 -= viewBox.y1;
    viewBox.x1 = 0;
    viewBox.y1 = 0;
    this._vchart.resize(viewBox.x2 - viewBox.x1, viewBox.y2 - viewBox.y1);
    this._vchart.updateViewBox(viewBox);
  }

  release() {
    this._vchart && this._vchart.release();
  }
}
