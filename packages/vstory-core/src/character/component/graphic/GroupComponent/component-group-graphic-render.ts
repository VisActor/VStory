import type {
  IContext2d,
  IDrawContext,
  IGraphicAttribute,
  IGraphicRender,
  IGraphicRenderDrawParams,
  IMarkAttribute,
  IRenderService,
  IThemeAttribute,
  IGraphic,
  IGroup
} from '@visactor/vrender';
import { injectable, DefaultCanvasGroupRender } from '@visactor/vrender';
import { COMPONENT_NUMBER_TYPE } from './component-group-graphic';

export const ComponentRender = Symbol.for('VStoryComponentRender');
export const ComponentRenderContribution = Symbol.for('VStoryComponentRenderContribution');

@injectable()
export class ComponentGroupRender extends DefaultCanvasGroupRender implements IGraphicRender {
  type: any = 'vstory-component-group';
  numberType: number = COMPONENT_NUMBER_TYPE;

  draw(group: IGroup, renderService: IRenderService, drawContext: IDrawContext, params?: IGraphicRenderDrawParams) {
    const { context } = drawContext;
    if (!context) {
      return;
    }
    const { wipeDirection, wipeRatio, wipeColor, wipeBlur } = group.attribute as any;
    const drawWipe = isFinite(wipeRatio);
    let x1;
    let y1;
    let x2;
    let y2;
    if (drawWipe) {
      const b = group.AABBBounds;
      if (wipeDirection === 'l2r') {
        x1 = b.x1;
        y1 = b.y1;
        x2 = x1 + b.width() * wipeRatio;
        y2 = b.height() + y1;
      } else if (wipeDirection === 'r2l') {
        x2 = b.x1;
        y1 = b.y1;
        x1 = x2 - b.width() * wipeRatio;
        y2 = b.height() + y1;
      } else if (wipeDirection === 't2b') {
        x1 = b.x1;
        y1 = b.y1;
        x2 = x1 + b.width();
        y2 = b.height() * wipeRatio + y1;
      } else if (wipeDirection === 'b2t') {
        x1 = b.x1;
        y2 = b.y1;
        x2 = x1 + b.width();
        y1 = y2 - b.height() * wipeRatio;
      }
      context.save();
      context.setTransformForCurrent();
      context.beginPath();
      context.rect(x1, y1, x2 - x1, y2 - y1);
      context.clip();
    }
    super.draw(group, renderService, drawContext, params);
    if (drawWipe) {
      context.restore();
    }
  }
}
