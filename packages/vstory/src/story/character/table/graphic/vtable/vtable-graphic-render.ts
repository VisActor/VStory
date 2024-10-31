import type {
  IContext2d,
  IDrawContext,
  IGraphicAttribute,
  IGraphicRender,
  IGraphicRenderDrawParams,
  IMarkAttribute,
  IRenderService,
  IThemeAttribute
} from '@visactor/vrender-core';
import { DefaultCanvasRectRender, injectable } from '@visactor/vrender-core';
import { TABLE_NUMBER_TYPE } from './vtable-graphic';

export const TableRender = Symbol.for('VStoryTableRender');
export const TableRenderContribution = Symbol.for('VStoryTableRenderContribution');

@injectable()
export class VTableRender extends DefaultCanvasRectRender implements IGraphicRender {
  type: 'table';
  numberType: number = TABLE_NUMBER_TYPE;

  drawShape(
    table: any,
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
    const { baseOpacity = 1 } = table.attribute;
    if (baseOpacity <= 0) {
      return;
    }
    context.save();
    context.baseGlobalAlpha *= baseOpacity;
    super.drawShape(table, context, x, y, drawContext, params, fillCb, strokeCb);
    context.baseGlobalAlpha /= baseOpacity;
    context.restore();
    const vTable = (table as any).vtable;
    const vTableStage = vTable.scenegraph.stage;
    const vTableCtx = vTableStage.window.getContext();
    vTableCtx.baseGlobalAlpha *= baseOpacity;
    // @ts-ignore
    vTableStage._editor_needRender = true;
    const matrix = table.globalTransMatrix.clone();
    const stageMatrix = table.stage.window.getViewBoxTransform().clone();
    stageMatrix.multiply(matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f);
    vTableStage.window.setViewBoxTransform(
      stageMatrix.a,
      stageMatrix.b,
      stageMatrix.c,
      stageMatrix.d,
      stageMatrix.e,
      stageMatrix.f
    );
    vTableStage.dirtyBounds?.clear();
    vTableStage.render();
    vTableCtx.baseGlobalAlpha /= baseOpacity;
  }

  draw(table: any, renderService: IRenderService, drawContext: IDrawContext, params?: IGraphicRenderDrawParams) {
    this._draw(table, {} as any, false, drawContext, params);
  }
}
