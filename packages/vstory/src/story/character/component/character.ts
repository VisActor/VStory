import type { IBoundsLike } from '@visactor/vutils';
import type { IGroup } from '@visactor/vrender';
import { GraphicBaseText } from './graphic/graphic-base-text';
import type { IComponentCharacterSpec } from '../dsl-interface';
import { CharacterBase } from '../base/base';
import type { Graphic } from './graphic/graphic';
import { getLayoutFromWidget } from '../../utils/layout';
import type { StoryEvent } from '../../interface/runtime-interface';
import type { ICharacter, ICharacterPickInfo } from '../runtime-interface';
import { ComponentGroup } from './character-group/component-group-graphic';

export abstract class CharacterComponent extends CharacterBase implements ICharacter {
  visActorType: 'component';
  protected declare _spec: IComponentCharacterSpec;
  get spec() {
    return this._spec;
  }
  // protected declare _graphic: Graphic;
  // get graphic() {
  //   return this._graphic;
  // }
  protected declare _text: GraphicBaseText;
  get text() {
    return this._text;
  }

  get textGraphic() {
    return this._text.graphic;
  }

  protected declare _group: IGroup;
  get group() {
    return this._group;
  }

  readonly graphicType: string = 'rect';

  protected _parserSpec(): void {
    return;
  }

  protected _initGraphics(): void {
    this._group = new ComponentGroup({
      ...getLayoutFromWidget(this._spec.position),
      angle: this._spec.options.angle,
      zIndex: this._spec.zIndex
    });
    this.option.graphicParent.add(this._group);

    this._graphic = this._createGraphic();
    this._text = new GraphicBaseText(this);
    this._graphic.init();
    this._text.init();

    this.applySpec();

    this.hide();
  }

  applySpec(): void {
    this._graphic.applyGraphicAttribute(this._spec.options.graphic);
    this._text.applyGraphicAttribute(this._spec.options.text);

    this._graphic.applyLayoutData(this._spec.position);
    this._text.applyLayoutData(this._spec.position);
  }

  setAttributes(updateAttr: Record<string, any>): void {
    const { position, ...rest } = updateAttr;
    const attr = { ...(position ?? {}), ...rest };
    this._spec.position = position;
    this.group.setAttributes(attr);
    this._graphic.setAttributes({ ...attr, x: 0, y: 0, angle: 0 });
    this._text.updateAttribute({});
  }

  protected abstract _createGraphic(): Graphic;

  protected _initRuntime(): void {
    return;
  }

  show(): void {
    this._group.setAttributes({ visible: true });
    this._text.show();
    this._graphic.show();
  }
  hide(): void {
    this._group.setAttributes({ visible: false });
    this._text.hide();
    this._graphic.hide();
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
