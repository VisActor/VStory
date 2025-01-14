import type { IInitOption, IVChart } from '@visactor/vchart';
import VChart from '@visactor/vchart';
import type { GraphicType, IGraphic, IGroup, IRectGraphicAttribute, ITicker } from '@visactor/vrender-core';
import { genNumberType, parsePadding, Rect } from '@visactor/vrender-core';
import type { IAABBBounds, IBoundsLike } from '@visactor/vutils';
import { Bounds, pointInAABB, transformBoundsWithMatrix } from '@visactor/vutils';
import { mergeChartOption } from '../../../utils/chart';
import { isBoundsLikeEqual } from '../../../utils/equal';

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
  vchartBoundsMode?: 'clip' | 'auto';
}

export const CHART_NUMBER_TYPE = genNumberType();

export class VChartGraphic extends Rect {
  type: GraphicType = 'chart' as any;
  declare attribute: IChartGraphicAttribute;
  protected _vchart: IVChart;

  get vchart() {
    return this._vchart;
  }
  // vchart 的实际绘图绘制位置
  // 首先 vchart.stage 会根据 stage.window.viewBoxTransform 变换第一次，这一次变化包括了
  // 1. 全局stage的缩放；2. vchart-graphic 的位置定位；3. auto 模式下的自动偏移（这个等同于位置偏移）
  // 然后 vchart.stage.defaultLayer 会根据偏移量，将图表绘制内容再偏移回来
  // 来回2次偏移的目的是，让 vchart 内容超出原是viewBox的部分，可以正常被viewBox包含并绘制
  protected _vchartAutoTranslate: { x: number; y: number } = { x: 0, y: 0 };
  get vchartAutoTranslate() {
    return this._vchartAutoTranslate;
  }

  // 实际渲染图表内容的 bounds
  // 只在 auto 模式下生效
  protected _displayBounds: Bounds;

  doUpdateAABBBounds(full?: boolean): IAABBBounds {
    if (!this._displayBounds) {
      return super.doUpdateAABBBounds(full);
    }
    this.updateAABBBoundsStamp++;
    const graphicTheme = this.getGraphicTheme();
    const bounds = this._displayBounds.clone();
    transformBoundsWithMatrix(bounds, bounds, this.transMatrix);
    // @ts-ignore
    const { boundsPadding = graphicTheme.boundsPadding } = this.attribute;
    const paddingArray = parsePadding(boundsPadding);
    if (paddingArray) {
      bounds.expand(paddingArray as number);
    }
    this.clearUpdateBoundTag();
    this._AABBBounds.copy(bounds);
    return bounds;
  }

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
      viewBox,
      vchartBoundsMode
    } = params;
    this.attribute.viewBox = viewBox;
    this.attribute.vchartBoundsMode = vchartBoundsMode;
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
            if (!(chartStage as any)._story_needRender) {
              chartStage.pauseRender();
              stage.dirtyBounds?.union(this.globalAABBBounds);
              stage.renderNextFrame();
            }
          },
          afterRender: stage => {
            // @ts-ignore
            stage._story_needRender = false;
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

    if (vchartBoundsMode === 'auto') {
      // auto 模式下，需要手动更新一下
      this.updateVChartGraphicViewBoxInAuto();
    }
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

  setAttribute(key: string, value: any) {
    if (key === 'viewBox') {
      super.setAttribute('x', value.x1);
      super.setAttribute('y', value.y1);
      this.updateVChartGraphicViewBox(value);
    }
    if (key === 'spec') {
      this._vchart.updateSpecSync(value, false, { reuse: false, morph: false }, { reMake: true, change: true });
    } else {
      super.setAttribute(key, value);
    }
  }
  setAttributes(attrs: IChartGraphicAttribute) {
    const lastedViewBox = this.attribute.viewBox;
    super.setAttributes(attrs);
    if (attrs.viewBox) {
      this.attribute.viewBox = lastedViewBox;
      this.updateVChartGraphicViewBox(attrs.viewBox);
    }
    if (attrs.spec) {
      this._vchart.updateSpecSync(attrs.spec, false, { reuse: false, morph: false }, { reMake: true, change: true });
    }
  }

  private _getVChartGroupActualBounds(bounds: Bounds, _group: IGraphic) {
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
      this._getVChartGroupActualBounds(bounds, _child as IGraphic);
    });
  }

  /**
   * 获取 VChart 图形的实际边界。
   * 该方法通过遍历 VChart stage的默认图层中的所有子组，计算并返回它们的边界框。
   *
   * @returns {Bounds} 返回包含所有子组边界的 Bounds 对象。
   */
  getVChartActualBounds() {
    const stage = this._vchart.getStage();
    // const layer = stage.defaultLayer;
    const root = stage.defaultLayer.getChildByName('root') as IGroup;
    const bounds = new Bounds();
    root.forEachChildren((child: IGroup) => {
      this._getVChartGroupActualBounds(bounds, child);
    });

    bounds.translate(-(stage.defaultLayer.attribute.x ?? 0), -(stage.defaultLayer.attribute.y ?? 0));
    return bounds;
  }

  updateVChartGraphicViewBox(bounds: IBoundsLike) {
    if (this.attribute.viewBox && isBoundsLikeEqual(this.attribute.viewBox, bounds)) {
      // 没有变化，不需要更新
      return;
    }
    // 先更新 viewBox
    this.attribute.viewBox = bounds;
    // 不是auto模式
    if (this.attribute.vchartBoundsMode !== 'auto') {
      // 直接更新
      this._vchart.updateViewBox(bounds);
      return;
    }
    this.updateVChartGraphicViewBoxInAuto();
  }

  updateVChartGraphicViewBoxInAuto() {
    // 1. 得到当前设置 viewBox 的实际渲染bounds
    const rect = this._vchart.getChart().getCanvasRect();
    const viewBoxSize = {
      width: this.attribute.viewBox.x2 - this.attribute.viewBox.x1,
      height: this.attribute.viewBox.y2 - this.attribute.viewBox.y1
    };
    // 当尺寸变化时，进行一次 resize
    if (rect.width !== viewBoxSize.width || rect.height !== viewBoxSize.height) {
      // vchart 使用当前的设置 viewBox 进行 resize
      // 这里的 resize 不期望修改viewBox
      // 但是 vchart 内 viewBox 优先级更高，所以这里的实现有点hack。
      // @ts-ignore
      this.vchart._viewBox = this.attribute.viewBox;
      // @ts-ignore
      this.vchart._option.viewBox = this.attribute.viewBox;
      // @ts-ignore
      this.vchart.getChart()._option.viewBox = this.attribute.viewBox;
      this.vchart.resize(viewBoxSize.width, viewBoxSize.height);
    }
    const rootBounds = this.getVChartActualBounds();
    // 2. 得到需要绘制全部内容时的 vchart 的 viewBox
    // 不要小于设置viewBox;
    rootBounds.union(this.attribute.viewBox);
    // 当前实际绘图内容的 bounds
    this._displayBounds = rootBounds.clone();
    // 3. 考虑到 vchart 可能会将内容绘制到 -x, -y，记录下这个偏移量
    this._vchartAutoTranslate.x = rootBounds.x1 < 0 ? rootBounds.x1 : 0;
    this._vchartAutoTranslate.y = rootBounds.y1 < 0 ? rootBounds.y1 : 0;
    // 4. 将 bounds 标准化到 0, 0, width, height
    rootBounds.translate(-this._vchartAutoTranslate.x, -this._vchartAutoTranslate.y);
    // 5. 将绘图 viewBox 更新到 vchart.stage
    // 注意不要更新到 vchart，更新到vchart会触发vchart重新布局，但是我们不需要vchart按照 viewBox_display 重新布局
    this._vchart.getStage().defaultLayer.translateTo(-this.vchartAutoTranslate.x, -this.vchartAutoTranslate.y);
    // @ts-ignore
    this._vchart._compiler._view.renderer.setViewBox(rootBounds, true);
  }
}
