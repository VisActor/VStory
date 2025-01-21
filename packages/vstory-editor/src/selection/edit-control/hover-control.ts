import { AbstractComponent } from '@visactor/vrender-components';
import type { IGroup, IGroupGraphicAttribute, IRect, IRectGraphicAttribute } from '@visactor/vrender-core';
import { createRect, IGraphic } from '@visactor/vrender-core';
import { IAABBBoundsLike, merge } from '@visactor/vutils';
import { SHAPE_HOVER_COLOR } from './constants';
import type { IEditSelection } from '../../interface';
import { VRenderPointerEvent } from '../../interface';

interface HoverControllerAttribute extends IGroupGraphicAttribute {
  hoverBorder: IRectGraphicAttribute;
}

export type IHoverController = IGroup;

// @ts-ignore
export class HoverController extends AbstractComponent<Required<HoverControllerAttribute>> implements IGroup {
  hoverBorder: IRect;
  editSelection: IEditSelection;

  static defaultAttributes: Partial<HoverControllerAttribute> = {
    hoverBorder: {
      stroke: SHAPE_HOVER_COLOR,
      strokeOpacity: 0.7,
      lineWidth: 2,
      lineDash: [8, 8]
    }
  };

  constructor(editSelection: IEditSelection, attributes: Partial<HoverControllerAttribute>) {
    super(merge(HoverController.defaultAttributes, attributes));
    this.editSelection = editSelection;
    this.hoverBorder = createRect({
      visible: false
    });
    this.add(this.hoverBorder);
  }

  protected render(): void {
    const { width, height, hoverBorder } = this.attribute;
    this.hoverBorder.setAttributes({
      visible: true,
      x: 0,
      y: 0,
      width,
      height,
      ...hoverBorder
    });
  }

  release(): void {
    this.parent.removeChild(this);
    this.removeAllChild();
    this.hoverBorder.release();
    this.hoverBorder = null;
    super.release();
  }
}
