import type { IRectGraphicAttribute } from '@visactor/vrender';
import { genNumberType, IGraphicAttribute, Rect } from '@visactor/vrender';
import { ListTable } from '@visactor/vtable';
import type { IVisactorGraphic } from '../../../visactor/interface';
import { normalizePadding } from '@visactor/vutils';

export interface ITableGraphicAttribute extends IRectGraphicAttribute {
  canvas: HTMLCanvasElement;
  records: any;
  columns: any;
  widthMode?: 'standard' | 'adaptive' | 'autoWidth';
  heightMode?: any;
  defaultRowHeight: number;
  theme: any;
  padding?: number | [number, number] | [number, number, number, number];
}

export const TABLE_NUMBER_TYPE = genNumberType();

export class VTableGraphic extends Rect implements IVisactorGraphic {
  type: any = 'table';
  declare attribute: ITableGraphicAttribute;
  protected _vtable: ListTable;

  declare valid: boolean;
  get vtable() {
    return this._vtable;
  }
  get vProduct() {
    return this._vtable;
  }

  constructor(params: ITableGraphicAttribute) {
    super({ ...params, visible: false });
    this.numberType = TABLE_NUMBER_TYPE;
    // 创建table
    const { width, height, canvas, records, columns, widthMode, heightMode, defaultRowHeight, theme, padding } = params;
    const parsedPadding = padding ? normalizePadding(padding) : [0, 0, 0, 0];
    const canvasWidth = width - parsedPadding[1] - parsedPadding[3];
    const canvasHeight = height - parsedPadding[0] - parsedPadding[2];
    this._vtable = new ListTable({
      canvasWidth,
      canvasHeight,
      viewBox: {
        x1: parsedPadding[3],
        y1: parsedPadding[0],
        x2: width - parsedPadding[1],
        y2: height - parsedPadding[2]
      },
      disableInteraction: true,
      canvas,
      records,
      columns,
      widthMode,
      heightMode,
      defaultRowHeight,
      theme,
      beforeRender: stage => {
        if (!stage) {
          return;
        }
        if (!stage._editor_needRender) {
          stage.pauseRender();
          stage.dirtyBounds?.union(this.globalAABBBounds);
          this.stage && this.stage.renderNextFrame();
        }
      },
      afterRender: stage => {
        if (!stage) {
          return;
        }
        // @ts-ignore
        stage._editor_needRender = false;
        stage.resumeRender();
      },
      padding: 0
    });
    (this._vtable.scenegraph.stage as any).background = false;
  }

  getViewBox(spec: ITableGraphicAttribute) {
    const { width, height, padding } = spec;
    const parsedPadding = padding ? normalizePadding(padding) : [0, 0, 0, 0];
    return {
      x1: parsedPadding[3],
      y1: parsedPadding[0],
      x2: width - parsedPadding[1] - parsedPadding[3],
      y2: height - parsedPadding[0] - parsedPadding[2]
    };
  }

  updateSpec(spec: ITableGraphicAttribute) {
    this._vtable &&
      this._vtable.updateOption({
        ...spec,
        viewBox: this.getViewBox(spec),
        padding: 0
      });
  }

  release(): void {
    this._vtable && this._vtable.release();
  }
}
