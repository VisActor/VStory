import type { IRichText, IRichTextGraphicAttribute, IText } from '@visactor/vrender';
import { createRichText, createText, RichTextEditPlugin } from '@visactor/vrender';
import type { IPointLike } from '@visactor/vutils';
import { Graphic } from './graphic';
import type { IWidgetData } from '../../dsl-interface';
import { getLayoutFromWidget } from '../../../utils/layout';

const richtextCombinedAttrs = [
  'fill',
  'stroke',
  'fontSize',
  'fontFamily',
  'fontStyle',
  'fontWeight',
  'lineWidth',
  'opacity',
  'fillOpacity',
  'strokeOpacity'
];

export class GraphicText extends Graphic {
  protected _graphic: IRichText;

  getInitialAttributes() {
    return {
      x: 0,
      y: 0,
      // width: 120,
      // height: 80,
      // angle: 0,
      fontSize: 16,
      textAlign: 'left',
      textBaseline: 'top',
      fill: '#000000',
      ellipsis: true,
      // lineWidth: 2,
      ignoreBuf: true
      // stroke: false,
      // shapePoints: [] as IPointLike[]
    };
  }

  setAttributes(attr: Record<string, any>): void {
    if (!this._graphic) {
      return;
    }

    if (attr.text) {
      attr.textConfig = this.transformTextAttrsToRichTextConfig();
    }
    // 文字的对齐方式只能在box内
    // if (attr.textAlign) {
    //   const textConfig = this._graphic.textConfig || this._graphic.attribute.textConfig || [];
    //   textConfig.forEach((item: any) => {
    //     item.textAlign = attr.textAlign;
    //   });
    //   attr = { ...attr, textAlign: 'left' };
    // }
    // super.setAttributes(attr);

    if (attr.text || attr.textConfig) {
      // 强行更新富文本的textConfig
      RichTextEditPlugin.tryUpdateRichtext(this._graphic);
    }

    const textConfig = (this._graphic.attribute.textConfig ?? []).map(c => {
      return {
        ...c,
        ...attr
      };
    });
    const obj: any = { textConfig, ...attr, textAlign: 'left' };
    this._graphic.setAttributes(obj);
  }

  protected transformTextAttrsToRichTextConfig() {
    const textAttr = (this._character.config.options?.graphic ?? {}) as IRichTextGraphicAttribute;
    let textConfig = textAttr.textConfig;

    // 如果是纯文本定义方式
    if (!(textConfig && textConfig.length) && textAttr.text) {
      const textList = Array.isArray(textAttr.text) ? textAttr.text : [textAttr.text];
      textConfig = textList.map((item, i) => {
        return {
          textAlign: textAttr.textAlign,
          textBaseline: textAttr.textBaseline,
          // ...((textAttr || {}) as any),
          text: item + (i < textList.length - 1 ? '\n' : '')
        };
      });
    }

    return textConfig;
  }

  init() {
    if (!this._graphic) {
      this._graphic = createRichText(
        this._transformAttributes({
          ...this.getInitialAttributes(),
          ...(this._character.config.options?.graphic ?? {}),
          textConfig: this.transformTextAttrsToRichTextConfig()
        })
      );
      this._graphic.name = `graphic-text-${this._character.id}`;
      this._character.getGraphicParent().add(this._graphic);
    }
  }

  applyLayoutData(w: Partial<IWidgetData>) {
    const { x, y, width, height, angle } = getLayoutFromWidget(w);
    this._graphic.setAttributes(
      this._transformAttributes({
        x,
        y,
        angle,
        width,
        height,
        maxLineWidth: width,
        heightLimit: height
      })
    );
  }
}
