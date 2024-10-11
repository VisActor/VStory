import type { IBoundsLike } from '@visactor/vutils';
import type { IGroup } from '@visactor/vrender';
import { GraphicBaseText } from './graphic/graphic-base-text';
import type { ICharacterConfig, IComponentCharacterConfig } from '../dsl-interface';
import { CharacterBase } from '../base/base';
import type { Graphic } from './graphic/graphic';
import { getLayoutFromWidget } from '../../utils/layout';
import type { StoryEvent } from '../../interface/runtime-interface';
import type { ICharacter, ICharacterPickInfo } from '../runtime-interface';
import { ComponentGroup } from './character-group/component-group-graphic';

export abstract class CharacterComponent extends CharacterBase implements ICharacter {
  visActorType: 'component';
  protected declare _config: IComponentCharacterConfig;
  get config() {
    return this._config;
  }
  // protected declare _graphic: Graphic;
  // get graphic() {
  //   return this._graphic;
  // }
  protected declare _text?: GraphicBaseText;
  get text() {
    return this._text;
  }

  get textGraphic() {
    return this._text && this._text.graphic;
  }

  protected declare _group: IGroup;
  get group() {
    return this._group;
  }

  readonly graphicType: string = 'rect';

  protected _parseConfig(): void {
    return;
  }

  protected _initGraphics(): void {
    this._group = new ComponentGroup({
      ...getLayoutFromWidget(this._config.position),
      // angle: this._config.options.angle,
      zIndex: this._config.zIndex
    });
    this.option.graphicParent.add(this._group);

    this._graphic = this._createGraphic();
    this._text = new GraphicBaseText(this);
    this._graphic.init();
    this._text.init();

    this._graphic.applyGraphicAttribute(this._config.options.graphic);
    this._text.applyGraphicAttribute(this._config.options.text);

    this._graphic.applyLayoutData(this._config.position);
    this._text.applyLayoutData(this._config.position);

    this.hide();
  }

  protected applyConfig(config: Omit<Partial<ICharacterConfig>, 'id' | 'type'>): void {
    if (config.position) {
      this.group.setAttributes(config.position);
    }
  }

  protected abstract _createGraphic(): Graphic;

  protected _initRuntime(): void {
    return;
  }

  show(): void {
    this._group.setAttributes({ visibleAll: true });
    // this._text.show();
    // this._graphic.show();
  }
  hide(): void {
    this._group.setAttributes({ visibleAll: false });
    // this._text.hide();
    // this._graphic.hide();
  }

  getTextLayoutRatio(): { left: number; right: number; top: number; bottom: number } {
    return this._graphic.getTextLayoutRatio();
  }

  clearCharacter(): void {
    this._group?.parent.removeChild(this._group);
    this._group = null;
  }

  getGraphicParent() {
    return this._group;
  }

  getLayoutBounds() {
    return this._group.AABBBounds as IBoundsLike;
  }

  checkEvent(event: StoryEvent): false | ICharacterPickInfo {
    if (!(event.detailPath ?? event.path).some(g => g === this._group)) {
      return false;
    }
    return {
      part: event.path[event.path.length - 1] === this._graphic.graphic ? 'graphic' : 'text',
      graphicType: this.graphicType
    };
  }

  release() {
    this.option.graphicParent.removeChild(this._group);
  }
}
