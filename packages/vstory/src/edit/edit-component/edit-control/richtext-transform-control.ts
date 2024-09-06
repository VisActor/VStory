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
} from '@visactor/vrender';
import { createRect, getTheme } from '@visactor/vrender';
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

  // domTextEditor?: HTMLElement;

  handlerDblClick = (e: any) => {
    // this.attachDomTextEditor();
    this.startEditText();
  };

  startEditText() {
    // 关掉上层的pick，开启richtext的editable
    this.rect.setAttributes({ pickable: false });
    this.editBorder.setAttributes({ pickable: false });
    this.setAttributes({ pickable: false });
    const character = this.editComponent.getActiveCharacter();
    if (!character) {
      return;
    }
    const text = (character as any)._text && (character as any)._text._graphic;
    text && text.setAttributes({ editable: true });
  }

  endEditText() {
    this.rect.setAttributes({ pickable: true });
    this.editBorder.setAttributes({ pickable: true });
    this.setAttributes({ pickable: true });
    const character = this.editComponent.getActiveCharacter();
    const text = (character as any)._text && (character as any)._text._graphic;
    text && text.setAttributes({ editable: false });
  }

  // protected attachDomTextEditor() {
  //   const stage = this.stage;
  //   if (!stage) {
  //     return;
  //   }
  //   const { x, y, width, height } = this.rect.attribute;
  //   const container = document.createElement('div');
  //   container.style.position = 'relative';
  //   container.style.display = 'flex';
  //   container.style.justifyContent = 'center';
  //   container.style.left = x + 'px';
  //   container.style.top = y + 'px';
  //   container.style.width = width + 'px';
  //   container.style.height = height + 'px';
  //   container.style.pointerEvents = 'none';
  //   const bg = document.createElement('div');
  //   bg.style.position = 'absolute';
  //   bg.style.zIndex = '-1';
  //   bg.style.width = '100%';
  //   bg.style.height = '100%';
  //   bg.style.opacity = '0.2';
  //   bg.style.background = BOUNDS_SELECT_COLOR;
  //   bg.style.cursor = 'text';
  //   container.appendChild(bg);
  //   stage.window.getContainer().appendChild(container);
  //   this.domTextEditor = container;

  //   // 添加textArea
  //   const character = this.editComponent.getActiveCharacter();
  //   const text = (character as any)._text && (character as any)._text._graphic;
  //   if (text) {
  //     const textArea = document.createElement('textArea') as HTMLTextAreaElement;
  //     const bounds = text.AABBBounds;
  //     const theme = getTheme(text).text;
  //     const {
  //       fontFamily = theme.fontFamily,
  //       fontSize = theme.fontSize,
  //       fontWeight = theme.fontWeight
  //     } = text.attribute;
  //     textArea.style.alignSelf = `center`;
  //     textArea.style.width = `${bounds.width()}px`;
  //     textArea.style.height = `${bounds.height()}px`;
  //     textArea.innerText = text.attribute.text;
  //     textArea.style.border = 'none';
  //     textArea.style.fontFamily = fontFamily;
  //     textArea.style.fontSize = fontSize;
  //     textArea.style.fontWeight = fontWeight;
  //     textArea.style.overflow = 'hidden';
  //     textArea.style.outline = 'none';
  //     textArea.style.resize = 'none';
  //     textArea.style.pointerEvents = 'all';
  //     container.appendChild(textArea);
  //   }

  //   // textArea.value = this.activeGraphic;
  // }

  protected render() {
    super.render();
    // if (this.domTextEditor) {
    //   const container = this.domTextEditor;
    //   const { x, y, width, height } = this.rect.attribute;
    //   container.style.left = x + 'px';
    //   container.style.top = y + 'px';
    //   container.style.width = width + 'px';
    //   container.style.height = height + 'px';
    // }
  }

  // detachDomTextEditor() {
  //   // if (this.domTextEditor && this.stage) {
  //   //   this.stage.window.getContainer().removeChild(this.domTextEditor);
  //   // }
  // }

  release(): void {
    // this.detachDomTextEditor();
    this.endEditText();
    super.release();
  }
}
