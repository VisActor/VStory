import type { Edit } from './../../edit';
import type { IRichText } from '@visactor/vrender-core';
import type { ICharacter } from '../../../story/character';
import type { IEditActionInfo, IEditComponent } from '../../interface';
import { RichTextControl } from '../edit-control/richtext-control';
import type { ITransformControl } from '../edit-control/transform-control';

export interface RichTextMixin extends IEditComponent {
  edit: Edit;
  _actionInfo: IEditActionInfo;
  _isSelection: boolean;
  isEditing: boolean;
  _layoutComponent?: ITransformControl;
  _activeCharacter?: ICharacter | null;
}

export class RichTextMixin {
  _richTextControl: RichTextControl;
  _textClickHandlerTemp: any;

  _createRichControl(character: ICharacter, text: IRichText) {
    this._richTextControl = new RichTextControl(this.edit, character, text);
    this._textClickHandlerTemp = this.handlerTextClick.bind(this);
    text.addEventListener('pointerdown', this._textClickHandlerTemp);
  }

  _releaseRichControl(character: ICharacter, text: IRichText) {
    this._richTextControl?.release();
    if (character) {
      text.removeEventListener('pointerdown', this._textClickHandlerTemp);
    }
    this._richTextControl = null;
    this._textClickHandlerTemp = null;
  }

  handlerTextClick() {
    this._richTextControl?.startEdit();
  }
}
