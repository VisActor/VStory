import type { ComponentOptions } from '@visactor/vrender-components';
import { AbstractComponent } from '@visactor/vrender-components';
import type { ITextComponentAttributes } from '../interface/character-text';
import { merge } from '@visactor/vutils';
import type { GraphicType, IRichText } from '@visactor/vrender-core';
import { COMPONENT_NUMBER_TYPE } from './GroupComponent/component-group-graphic';

// 文字组件可以根据锚点进行定位
export class TextComponent extends AbstractComponent<ITextComponentAttributes> {
  type: GraphicType = 'vstory-component-group' as any;
  numberType: number = COMPONENT_NUMBER_TYPE;

  static defaultAttributes: Partial<ITextComponentAttributes> = {
    visible: true,
    textStyle: {
      fontSize: 12,
      fill: '#000',
      textAlign: 'center',
      textBaseline: 'middle'
    },
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  };

  constructor(attributes: ITextComponentAttributes, options?: ComponentOptions) {
    super(options?.skipDefault ? attributes : merge({}, TextComponent.defaultAttributes, attributes));
  }

  protected render(): void {
    // text在group中进行布局，如果给定了宽高的话
    // 如果没有给定宽高的话，就按照文本的宽高进行布局，同时要加上padding
    const { textStyle, padding, width, height } = this.attribute as ITextComponentAttributes;

    const { textAlign, textBaseline } = textStyle;
    const { align = textAlign, baseline = textBaseline } = textStyle;

    const boxAlign = align === 'start' ? 'left' : align === 'end' ? 'right' : align;
    const boxBaseline = baseline;
    let textConfig = this.transformTextAttrsToRichTextConfig(textStyle, 'left');

    // 先设置一个初始richtext，用于计算bounds
    const richtext = this.createOrUpdateChild(
      'text',
      {
        ...(textStyle as any),
        width: 0,
        height: 0,
        textAlign: 'left',
        textBaseline: 'top',
        verticalDirection: 'top',
        textConfig
      },
      'richtext'
    ) as IRichText;

    // 测量宽高
    let boxWidth = width;
    let boxHeight = height;
    if (!isFinite(boxWidth)) {
      boxWidth = richtext.AABBBounds.width() + (padding?.left ?? 0) + (padding?.right ?? 0);
    }
    if (!isFinite(boxHeight)) {
      boxHeight = richtext.AABBBounds.height() + (padding?.top ?? 0) + (padding?.bottom ?? 0);
    }

    // 重新设置richtext的位置，align设置在textConfig中，baseline设置到verticalDirection
    textConfig = this.transformTextAttrsToRichTextConfig(
      textStyle,
      textAlign === 'start' ? 'left' : textAlign === 'end' ? 'right' : textAlign
    );
    richtext.setAttributes({
      textConfig,
      verticalDirection: textBaseline === 'alphabetic' ? 'middle' : textBaseline,
      width: boxWidth,
      height: boxHeight
      // x: boxWidth / 2,
      // y: boxHeight / 2
    });

    this.attribute.width = boxWidth;
    this.attribute.height = boxHeight;

    if (boxAlign === 'left') {
      this.attribute.dx = 0;
    } else if (boxAlign === 'right') {
      this.attribute.dx = -boxWidth;
    } else {
      this.attribute.dx = -boxWidth / 2;
    }

    if (boxBaseline === 'top') {
      this.attribute.dy = 0;
    } else if (boxBaseline === 'bottom') {
      this.attribute.dy = -boxHeight;
    } else {
      this.attribute.dy = -boxHeight / 2;
    }
  }

  protected transformTextAttrsToRichTextConfig(
    textStyle: ITextComponentAttributes['textStyle'],
    align: 'left' | 'center' | 'right'
  ) {
    let textConfig = textStyle.textConfig;

    // 如果是纯文本定义方式
    if (!(textConfig && textConfig.length) && textStyle.text) {
      const textList = Array.isArray(textStyle.text) ? textStyle.text : [textStyle.text];
      textConfig = textList.map((item, i) => {
        return {
          textAlign: align,
          text: item + (i < textList.length - 1 ? '\n' : '')
        };
      });
    }

    return textConfig;
  }
}
