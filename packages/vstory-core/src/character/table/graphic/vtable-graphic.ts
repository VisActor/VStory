import type { GraphicType, IRectGraphicAttribute, ITicker, IStage } from '@visactor/vrender-core';
import { genNumberType, parsePadding, Rect } from '@visactor/vrender-core';
import type { IAABBBounds, IBoundsLike, Bounds } from '@visactor/vutils';
import { pointInAABB, transformBoundsWithMatrix } from '@visactor/vutils';
import { isBoundsLikeEqual } from '../../../utils/equal';
import * as VTable from '@visactor/vtable';
import { VChart, type IInitOption } from '@visactor/vchart';
import type { IVTable } from '../interface/character-table';

VTable.register.chartModule('vchart', VChart);

export const TableClass: { [key: string]: any } = {
  table: VTable.ListTable,
  raw_table: VTable.ListTable,

  pivot_table: VTable.PivotTable,
  trend_table: VTable.PivotTable,
  okr_table: VTable.PivotTable,

  combination: VTable.PivotChart,
  // 其他都是 PivotChart

  ListTable: VTable.ListTable,
  PivotTable: VTable.PivotTable,
  PivotChart: VTable.PivotChart
};

export interface ITableConstructor {
  new (option: any): IVTable;
}

export interface ITableGraphicAttribute {
  renderCanvas: HTMLCanvasElement;
  spec: any;
  // 表格类型
  tableType: string;
  // ClassType: any;
  TableConstructor?: ITableConstructor;
  dpr: number;
  interactive?: boolean;
  animation?: boolean;
  // 图表的初始化参数
  chartOption?: IInitOption;
  viewBox: IBoundsLike;
  ticker?: ITicker;
  autoRender?: boolean;
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

export const TABLE_NUMBER_TYPE = genNumberType();

export class VTableGraphic extends Rect {
  type: GraphicType = 'table' as any;
  declare attribute: ITableGraphicAttribute;
  protected _vTable: IVTable;

  get vTable() {
    return this._vTable;
  }
  get vTableStage(): IStage {
    return this._vTable.scenegraph.stage as IStage;
  }
  // vtable 的实际绘图绘制位置
  // 首先 vtable.stage 会根据 stage.window.viewBoxTransform 变换第一次，这一次变化包括了
  // 1. 全局stage的缩放；2. vtable-graphic 的位置定位；3. auto 模式下的自动偏移（这个等同于位置偏移）
  // 然后 vtable.stage.defaultLayer 会根据偏移量，将图表绘制内容再偏移回来
  // 来回2次偏移的目的是，让 vtable 内容超出原是viewBox的部分，可以正常被viewBox包含并绘制
  protected _vTableAutoTranslate: { x: number; y: number } = { x: 0, y: 0 };
  get vTableAutoTranslate() {
    return this._vTableAutoTranslate;
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

  constructor(params: ITableGraphicAttribute) {
    const { panel, zIndex, TableConstructor } = params;
    super({ ...(panel || {}), zIndex, visible: false });
    this.numberType = TABLE_NUMBER_TYPE;
    // 创建table
    this.attribute.viewBox = params.viewBox;
    const filledOption = this._createOption(params);
    this._vTable = new (TableConstructor ?? TableClass[params.tableType] ?? VTable.PivotChart)(filledOption);

    // 背景设置为false后，不会擦除画布内容，可以实现元素正常堆叠绘制
    const stage = this._vTable.scenegraph.stage;
    // TODO stage的pauseRender支持传入count
    (stage as any)._skipRender = -Infinity;
    this._vTable.render();
    if (stage) {
      stage.background = false as any;
      // 关闭交互
      // stage.pauseTriggerEvent();
    }
    stage.resumeRender();
  }

  private _createOption(params: ITableGraphicAttribute) {
    const filledOption = { ...params.spec };
    const viewBox = params.viewBox;
    filledOption.viewBox = this._transformViewBoxToZero(viewBox);
    filledOption.beforeRender = () => {
      if (!this._vTable) {
        return;
      }
      const tableStage = this._vTable.scenegraph.stage;
      if (!(tableStage as any)._story_needRender) {
        // @ts-ignore
        tableStage.pauseRender();

        this.stage.dirtyBounds?.union(this.globalAABBBounds);
        this.stage.renderNextFrame();
      }
    };
    filledOption.afterRender = () => {
      if (!this._vTable) {
        return;
      }
      // @ts-ignore
      this._vTable.scenegraph.stage._story_needRender = false;
      // @ts-ignore
      this._vTable.scenegraph.stage.resumeRender();
    };

    return filledOption;
  }

  private _transformViewBoxToZero(_viewBox: IBoundsLike) {
    const viewBox = { ..._viewBox };
    viewBox.x2 -= viewBox.x1;
    viewBox.y2 -= viewBox.y1;
    viewBox.x1 = 0;
    viewBox.y1 = 0;
    return viewBox;
  }

  /**
   * 判定点是否在设置 viewBox 内。设置 viewBox 会小于展示 bounds
   * @param canvasX
   * @param canvasY
   */
  pointInViewBox(canvasX: number, canvasY: number): boolean {
    const target = { x: 0, y: 0 };
    this.globalTransMatrix.transformPoint({ x: canvasX, y: canvasY }, target);
    return pointInAABB(target, this._vTable.scenegraph.stage.viewBox);
  }

  release() {
    this._vTable && this._vTable.release();
    super.release();
  }

  setAttribute(key: string, value: any) {
    if (key === 'viewBox') {
      super.setAttribute('x', value.x1);
      super.setAttribute('y', value.y1);
      this.updateVTableGraphicViewBox(value);
    } else {
      super.setAttribute(key, value);
    }
  }
  setAttributes(attrs: ITableGraphicAttribute) {
    const lastedViewBox = this.attribute.viewBox;
    super.setAttributes(attrs);
    if (attrs.viewBox) {
      this.attribute.viewBox = lastedViewBox;
      this.updateVTableGraphicViewBox(attrs.viewBox);
    }
  }

  /**
   * 获取 VTable 图形的实际边界。
   * 该方法通过遍历 VTable stage的默认图层中的所有子组，计算并返回它们的边界框。
   *
   * @returns {Bounds} 返回包含所有子组边界的 Bounds 对象。
   */
  getVTableActualBounds() {
    return this.attribute.viewBox;
  }

  updateVTableGraphicViewBox(bounds: IBoundsLike) {
    if (this.attribute.viewBox && isBoundsLikeEqual(this.attribute.viewBox, bounds)) {
      // 没有变化，不需要更新
      return;
    }
    // 先更新 viewBox
    this.attribute.viewBox = bounds;
    // 直接更新viewBox
    // @ts-ignore
    this._vTable.updateViewBox(this._transformViewBoxToZero(bounds));
  }
}
