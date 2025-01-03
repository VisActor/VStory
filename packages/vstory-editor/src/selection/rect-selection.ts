import { CharacterType } from '@visactor/vstory-core';
import type { IEditActionInfo, IEditSelection } from '../interface';
import { RichTextSelectionCommon } from './richtext-selection-common';

export class RectSelection extends RichTextSelectionCommon implements IEditSelection {
  readonly level = 3;
  readonly type: string = 'rect';
  readonly editCharacterType: string = CharacterType.RECT;
  readonly supportedCharacterType: string[] = [CharacterType.RECT];

  startEdit(actionInfo: IEditActionInfo) {
    super.startEdit(actionInfo);
    // @ts-ignore;
    const character = this._actionInfo.character;
    character.graphic.addEventListener('pointerdown', this.handlerContentClick);
  }
  endEdit() {
    // @ts-ignore;
    const character = this._actionInfo.character;
    character.graphic.removeEventListener('pointerdown', this.handlerContentClick);
    super.endEdit();
  }

  handlerContentClick = (e: any) => {
    this._layoutController.handleDragMouseDown(e);
    // this.endRichTextEdit();
  };
}
