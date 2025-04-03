import type { Edit } from './../../edit';
import type { IRichText } from '@visactor/vrender-core';
import type { IEditActionInfo, IEditSelection } from '../../interface';
import { RichTextControl } from '../edit-control/richtext-control';
import type { ICharacter } from '@visactor/vstory-core';

export interface RichTextMixin extends IEditSelection {
  edit: Edit;
  _actionInfo: IEditActionInfo;
  _isSelection: boolean;
  isEditing: boolean;
  mode: 'edit-text' | 'normal';
}

export class RichTextMixin {
  _richTextControl: RichTextControl;
  _textClickHandlerTemp: any;
  // _hasDrag: boolean = false;
  // _pointerdownHandlerTemp: any;
  declare _layoutController: any;

  _createRichControl(character: ICharacter, text: IRichText, e: PointerEvent) {
    this._richTextControl = new RichTextControl(this.edit, character, text);
    this._tryStartEdit(e);
    // this._pointerdownHandlerTemp = this.handlerPointerDown.bind(this, text);
    // text.addEventListener('pointerdown', this._pointerdownHandlerTemp);
    // 暂停拖拽控件
    this._layoutController && this._layoutController.pauseDragger && this._layoutController.pauseDragger();
    this._layoutController && this._layoutController.hide && this._layoutController.hide();
  }

  _releaseRichControl(character: ICharacter, text: IRichText) {
    if (!this._richTextControl) {
      return;
    }
    this._richTextControl.endEdit();
    this._richTextControl.release();
    if (text) {
      // text.removeEventListener('pointerdown', this._pointerdownHandlerTemp);
    }
    this._richTextControl = null;
    this._textClickHandlerTemp = null;
    this._layoutController && this._layoutController.resumeDragger && this._layoutController.resumeDragger();
    this._layoutController && this._layoutController.show && this._layoutController.show();
  }

  _tryStartEdit(e: PointerEvent) {
    // 必须是点击才行，拖动不行
    // if (this._hasDrag) {
    //   return;
    // }
    this.mode = 'edit-text';
    this._richTextControl?.startEdit();
    this._richTextControl?.focusAndSelectAll(e);
  }

  // handlerPointerDown(text: IRichText) {
  //   // const uped = false;
  //   this._hasDrag = false;
  //   // const count = 0;
  //   // const handlerMove = (e: PointerEvent) => {
  //   //   console.log('aaaaaaaaaaaaaaaa')
  //   //   // 认为鼠标按下，然后拖动事件触发次数大于2次，就算拖动，就不触发富文本编辑
  //   //   if (!uped && count++ > 2) {
  //   //     this._hasDrag = true;
  //   //   }
  //   // };
  //   // text.addEventListener('pointermove', handlerMove);
  //   // text.stage.once('pointerup', () => {
  //   //   uped = true;
  //   //   text.removeEventListener('pointermove', handlerMove);
  //   // });
  // }
}
