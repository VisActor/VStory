import { EventEmitter, Point } from '@visactor/vutils';
import type { IRichText, RichTextEditPlugin } from '@visactor/vrender';
import type { ICharacter } from './../../../story/character/runtime-interface';
import type { Edit } from '../../edit';
import { EditActionEnum } from '../../interface';
export class RichTextControl {
  protected _character: ICharacter;
  protected _richText: IRichText;
  protected _edit: Edit;

  emitter: EventEmitter = new EventEmitter();

  constructor(edit: Edit, character: ICharacter, richText: IRichText) {
    this._character = character;
    this._richText = richText;
    this._edit = edit;
    this._initPlugin();
  }

  protected _initPlugin() {
    this._edit.editAction.emitter.on(EditActionEnum.richTextPluginEdit, this.onRichTextPluginEdit);
  }

  onRichTextPluginEdit = (msg: { type: string; p: RichTextEditPlugin }) => {
    this._edit.emitter.emit(EditActionEnum.richTextPluginEdit, { data: msg, character: this._character });
    const { type, p } = msg;
    if (p.currRt !== this._richText) {
      console.warn('current edit richtext not match in richtext-control.onRichTextPluginEdit');
      return;
    }
    if (msg.type === 'change' && this._character) {
      this._character.setConfig({
        options: { graphic: { textConfig: this._richText.attribute.textConfig } }
      });
    }
    // do noting 富文本编辑消息的处理
    // console.log('onRichTextPluginEdit', type, p);
  };

  startEdit() {
    this._richText.setAttributes({ editable: true });
  }

  // 聚焦到富文本上
  focus(e: PointerEvent) {
    // 找到plugin
    const stage = this._richText.stage;
    if (!stage) {
      return;
    }
    const plugin = stage.pluginService.findPluginsByName('RichTextEditPlugin')[0];
    if (!plugin) {
      return;
    }
    (plugin as any).forceFocus && (plugin as any).forceFocus(e);
  }

  endEdit() {
    this._richText.setAttributes({ editable: false });
  }

  release() {
    this._edit.editAction.emitter.off(EditActionEnum.richTextPluginEdit, this.onRichTextPluginEdit);
  }
}
