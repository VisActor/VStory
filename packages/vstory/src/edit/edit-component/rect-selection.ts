import { RichTextControl } from './edit-control/richtext-control';
import type { IEditActionInfo } from '../interface';
import { type IEditComponent } from '../interface';
import type { IRichText } from '@visactor/vrender-core';
import { RichTextSelectionCommon } from './richtext-selection-common';

export class RectSelection extends RichTextSelectionCommon implements IEditComponent {
  readonly level = 3;
  readonly type: string = 'rect';
  readonly editCharacterType = 'RectComponent';

  startEdit(actionInfo: IEditActionInfo) {
    super.startEdit(actionInfo);
    // @ts-ignore;
    const character = this._actionInfo.character;
    character.graphic.graphic.addEventListener('pointerdown', this.handlerRectClick);
  }
  editEnd() {
    // @ts-ignore;
    const character = this._actionInfo.character;
    character.graphic.graphic.removeEventListener('pointerdown', this.handlerRectClick);
    super.editEnd();
  }

  handlerRectClick = e => {
    this._layoutComponent.handleDragMouseDown(e);
    this.endRichTextEdit();
  };
}
