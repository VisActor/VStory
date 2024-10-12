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
  mode: 'edit-text' | 'normal';
}

export class RichTextMixin {
  _richTextControl: RichTextControl;
  _textClickHandlerTemp: any;
  _hasDrag: boolean = false;
  _pointerdownHandlerTemp: any;

  _createRichControl(character: ICharacter, text: IRichText) {
    this._richTextControl = new RichTextControl(this.edit, character, text);
    this._textClickHandlerTemp = this.handlerTextClick.bind(this);
    text.addEventListener('click', this._textClickHandlerTemp);
    this._pointerdownHandlerTemp = this.handlerPointerDown.bind(this, text);
    text.addEventListener('pointerdown', this._pointerdownHandlerTemp);
  }

  _releaseRichControl(character: ICharacter, text: IRichText) {
    this._richTextControl?.release();
    if (text) {
      text.removeEventListener('click', this._textClickHandlerTemp);
      text.removeEventListener('pointerdown', this._pointerdownHandlerTemp);
    }
    this._richTextControl = null;
    this._textClickHandlerTemp = null;
  }

  handlerTextClick(e: PointerEvent) {
    // 必须是点击才行，拖动不行
    if (this._hasDrag) {
      return;
    }
    this.mode = 'edit-text';
    this._richTextControl?.startEdit();
    this._richTextControl?.focus(e);
  }

  handlerPointerDown(text: IRichText) {
    let uped = false;
    this._hasDrag = false;
    let count = 0;
    const handlerMove = (e: PointerEvent) => {
      // 认为鼠标按下，然后拖动事件触发次数大于2次，就算拖动，就不触发富文本编辑
      if (!uped && count++ > 2) {
        this._hasDrag = true;
      }
    };
    text.addEventListener('pointermove', handlerMove);
    text.stage.once('pointerup', () => {
      uped = true;
      text.removeEventListener('pointermove', handlerMove);
    });
  }
}
