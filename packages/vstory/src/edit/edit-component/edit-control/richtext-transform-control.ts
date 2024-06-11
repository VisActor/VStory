/**
 * @description PopTip组件
 */
import type {
  ICircleGraphicAttribute,
  IPathGraphicAttribute,
  IGraphic,
  IGroupGraphicAttribute,
  IRect,
  IRectGraphicAttribute,
  ILineGraphicAttribute,
  IGroup
} from '@visactor/vrender-core';
import { createRect } from '@visactor/vrender-core';
import type { IAABBBounds, IAABBBoundsLike, IPointLike } from '@visactor/vutils';
import { AABBBounds, merge, normalizePadding, pi } from '@visactor/vutils';
import { AbstractComponent } from '@visactor/vrender-components';
import { transformPointWithMatrix } from '../../../util/space';
import { MinSize } from '../../../constants/attribute';
import { normalizeAngle } from '../../../util/math';
import { BOUNDS_SELECT_COLOR, DRAG_ANCHOR_COLOR, SHAPE_SELECT_COLOR } from './constants';
import type { VRenderPointerEvent } from '../../../interface/type';
import type { IEditComponent } from '../../interface';
import type { ITransformControl } from './transform-control';
import { TransformControl } from './transform-control';

export class RichTextTransformControl extends TransformControl implements ITransformControl {
  initEvent(): void {
    super.initEvent();
    this.rect.addEventListener('dblclick', this.handlerDblClick);
  }

  releaseEvent(): void {
    super.releaseEvent();
    this.rect.removeEventListener('dblclick', this.handlerDblClick);
  }

  domTextEditor?: HTMLElement;

  handlerDblClick = (e: any) => {
    this.attachDomTextEditor();
  };

  protected attachDomTextEditor() {
    const stage = this.stage;
    if (!stage) {
      return;
    }
    const { x, y, width, height } = this.rect.attribute;
    const container = document.createElement('div');
    container.style.position = 'relative';
    container.style.left = x + 'px';
    container.style.top = y + 'px';
    container.style.width = width + 'px';
    container.style.height = height + 'px';
    container.style.pointerEvents = 'none';
    const bg = document.createElement('div');
    bg.style.width = '100%';
    bg.style.height = '100%';
    bg.style.opacity = '0.2';
    bg.style.background = BOUNDS_SELECT_COLOR;
    bg.style.cursor = 'text';
    container.appendChild(bg);
    stage.window.getContainer().appendChild(container);
    this.domTextEditor = container;
  }

  protected render() {
    super.render();
    if (this.domTextEditor) {
      const container = this.domTextEditor;
      const { x, y, width, height } = this.rect.attribute;
      container.style.left = x + 'px';
      container.style.top = y + 'px';
      container.style.width = width + 'px';
      container.style.height = height + 'px';
    }
  }

  detachDomTextEditor() {
    if (this.domTextEditor && this.stage) {
      this.stage.window.getContainer().removeChild(this.domTextEditor);
    }
  }

  onInActive(): void {
    super.onInActive();
    this.detachDomTextEditor();
  }

  release(): void {
    this.detachDomTextEditor();
    super.release();
  }
}
