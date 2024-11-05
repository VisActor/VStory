import type { IGroup } from '@visactor/vrender-core';
import { createRichText, IText, ITextGraphicAttribute } from '@visactor/vrender-core';
import { CharacterType } from '../../../constants/character';
import { CharacterComponent } from '../character-component';
import type { ITextComponentAttributes } from '../interface/character-text';
import { TextComponent } from '../graphic/TextComponent';
import type { IComponentCharacterRuntimeConstructor } from '../interface/runtime';
import { TextRuntime } from '../runtime/text';

export class TextCharacter extends CharacterComponent<TextComponent, ITextComponentAttributes> {
  static type = CharacterType.TEXT;

  protected _group: IGroup;

  static RunTime: IComponentCharacterRuntimeConstructor[] = [TextRuntime];

  protected createAndAddGraphic(attribute: ITextComponentAttributes): void {
    this._graphic = new TextComponent(attribute);
    this.canvas.addGraphic(this._graphic);
  }

  protected _initRuntime(): void {
    TextCharacter.RunTime.forEach(R => {
      this._runtime.push(new R(this));
    });
  }

  protected getDefaultAttribute(): Partial<ITextComponentAttributes> {
    return {
      visible: true,
      x: 0,
      y: 0,
      textStyle: {
        textAlign: 'left',
        textBaseline: 'top',
        text: 'input your text',
        fontSize: 16,
        ignoreBuf: true
      }
    };
  }

  protected _clearGraphic(): void {
    super._clearGraphic();
  }

  show() {
    this._graphic.setAttribute('visibleAll', true);
  }
  hide() {
    this._graphic.setAttribute('visibleAll', false);
  }
}
