import { StoryComponentType } from '../../constants/character';
import type { VRenderPointerEvent } from '../../interface/type';
import type { IEditActionInfo } from '../interface';
import { type IEditComponent } from '../interface';
import type { IUpdateParams } from './edit-control/transform-control';
import { RichTextSelectionCommon } from './richtext-selection-common';

export class RectSelection extends RichTextSelectionCommon implements IEditComponent {
  readonly level = 3;
  readonly type: string = 'rect';
  readonly editCharacterType: string = StoryComponentType.RECT;

  startEdit(actionInfo: IEditActionInfo) {
    super.startEdit(actionInfo);
    // @ts-ignore;
    const character = this._actionInfo.character;
    character.graphic.graphic.addEventListener('pointerdown', this.handlerContentClick);
  }
  editEnd() {
    // @ts-ignore;
    const character = this._actionInfo.character;
    character.graphic.graphic.removeEventListener('pointerdown', this.handlerContentClick);
    super.editEnd();
  }

  handlerContentClick = (e: any) => {
    this._layoutComponent.handleDragMouseDown(e);
    this.endRichTextEdit();
  };

  protected handlerTransformChange(data: IUpdateParams, event?: VRenderPointerEvent): void {
    return super.handlerTransformChange(data, event);
  }
}
