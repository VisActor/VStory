import type { Graphic } from '../graphic/graphic';
import { GraphicText } from '../graphic/text';
import { CharacterComponent } from '../character';
import { StoryComponentType } from '../../../../constants/character';
import { ComponentGroup } from '../character-group/component-group-graphic';
import { getLayoutFromWidget } from '../../../utils/layout';
import { isValid } from '@visactor/vutils';

/**
 * text component 没有关联 graphic，逻辑与 GraphicText 有所不同
 */
export class CharacterComponentText extends CharacterComponent {
  readonly graphicType: string = 'text';
  protected _createGraphic(): Graphic {
    return new GraphicText(StoryComponentType.TEXT, this as any);
  }

  protected _initGraphics(): void {
    this._group = new ComponentGroup({
      ...getLayoutFromWidget(this._config.position),
      // angle: this._config.options.angle,
      zIndex: this._config.zIndex,
      ...(this._config.options.group || {})
    });
    this.option.graphicParent.add(this._group);

    this._graphic = this._createGraphic();
    this._graphic.init();

    this._graphic.applyGraphicAttribute(this._config.options.graphic);

    this._graphic.applyLayoutData(this._config.position);

    this.hide();
  }

  applyConfig(config: Record<string, any>): void {
    const { position, options = {}, zIndex } = config;
    if (position) {
      this.group.setAttributes(position);
      this._graphic.setAttributes({ width: position.width, height: position.height });
    }
    if (isValid(zIndex)) {
      this.group.setAttributes({ zIndex });
    }
    if (options.graphic) {
      this._graphic.setAttributes(options.graphic);
    }
    if (options.group) {
      this._group.setAttributes(options.group);
    }
  }
}
