import { type IEditActionInfo, type IEditComponent } from '../interface';

import type { Edit } from '../edit';
import { StoryComponentType } from '../../constants/character';
import { RichTextSelectionCommon } from './richtext-selection-common';

export class TextSelection extends RichTextSelectionCommon implements IEditComponent {
  readonly level = 3;
  readonly type: string = 'text';
  readonly editCharacterType: string = StoryComponentType.TEXT;
  protected mode: 'edit' | 'normal' = 'normal';

  constructor(public readonly edit: Edit) {
    super(edit);
  }

  startEdit(actionInfo: IEditActionInfo) {
    super.startEdit(actionInfo);
    // @ts-ignore;
    const character = this._actionInfo.character;
    character.graphic.graphic.addEventListener('pointerdown', this.handlerContentClick);
    character.graphic.graphic.addEventListener('dblclick', this.handlerTextEdit);
  }

  endEdit() {
    this.endRichTextEdit();
    // @ts-ignore;
    const character = this._actionInfo.character;
    character.graphic.graphic.removeEventListener('pointerdown', this.handlerContentClick);
    character.graphic.graphic.removeEventListener('dblclick', this.handlerTextEdit);
    super.endEdit();
    this.mode = 'normal';
  }

  handlerContentClick = (e: any) => {
    if (this.mode === 'edit') {
      return;
    }
    this._layoutComponent.handleDragMouseDown(e);
    this.endRichTextEdit();
  };
  handlerTextEdit = (e: any) => {
    this.mode = 'edit';
    return;
  };

  protected _getRichText() {
    // @ts-ignore
    const character = (this._actionInfo as any).character;
    const text = character.graphic.graphic;
    return { character, text };
  }
}
