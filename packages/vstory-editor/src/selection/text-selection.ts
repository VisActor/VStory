import { CharacterType } from '@visactor/vstory-core';
import type { IEditActionInfo, IEditSelection } from '../interface';
import { RichTextSelectionCommon } from './richtext-selection-common';

export class TextSelection extends RichTextSelectionCommon implements IEditSelection {
  readonly level = 3;
  readonly type: string = CharacterType.TEXT;
  readonly editCharacterType: string = CharacterType.TEXT;
  readonly supportedCharacterType: string[] = [CharacterType.TEXT];
  protected mode: 'edit-text' | 'normal' = 'normal';

  startEdit(actionInfo: IEditActionInfo) {
    super.startEdit(actionInfo);
    // @ts-ignore;
    const character = this._actionInfo.character;
    character.graphic.addEventListener('pointerdown', this.handlerContentClick);

    character.graphic.addEventListener('dblclick', this.handlerTextEdit);
  }
  endEdit() {
    // @ts-ignore;
    const character = this._actionInfo.character;
    character.graphic.removeEventListener('pointerdown', this.handlerContentClick);
    character.graphic.addEventListener('pointerup', this.handlerTextEdit);
    this._releaseRichControl(character, character.graphic.mainGraphic);
    super.endEdit();
    this.mode = 'normal';
  }

  handlerTextEdit = (e: any) => {
    if (this.isEditing) {
      this.mode = 'edit-text';
      const character = this._actionInfo.character;
      this._createRichControl(character, character.graphic.mainGraphic, e);
    }
    return;
  };

  handlerContentClick = (e: any) => {
    this._layoutController.handleDragMouseDown(e);
    // this.endRichTextEdit();
  };
}
