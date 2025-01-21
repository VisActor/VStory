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
import type { VTableGraphic } from './vtable-graphic';
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
    context.baseGlobalAlpha *= baseOpacity;
    super.drawShape(table, context, x, y, drawContext, params, fillCb, strokeCb);
    // TODO 考虑一个通用的ctx清理逻辑
    if (context._clearFilterStyle && context.nativeContext) {
      context.nativeContext.filter = 'blur(0px)';
      context._clearFilterStyle = false;
    }
    context.baseGlobalAlpha /= baseOpacity;
    const vTable = (table as VTableGraphic).vTable;
    const vTableStage = vTable.scenegraph.stage;
    const vTableCtx = vTableStage.window.getContext();
    vTableCtx.baseGlobalAlpha *= baseOpacity;
    // @ts-ignore
    vTableStage._story_needRender = true;
    const matrix = table.globalTransMatrix.clone();
    // auto 模式下，需要将vTable.stage的viewBoxTransform 设置到包含偏移量的位置
    matrix.translate(table.vTableAutoTranslate.x, table.vTableAutoTranslate.y);
    const stageMatrix = table.stage.window.getViewBoxTransform().clone();
    stageMatrix.multiply(matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f);
    // vTableStage.setViewBox();
    // @ts-ignore
    vTable.setViewBoxTransform(
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
    // const tableAttribute = getTheme(table, params?.theme).circle;
    this._draw(table, {} as any, false, drawContext, params);
  }
}
