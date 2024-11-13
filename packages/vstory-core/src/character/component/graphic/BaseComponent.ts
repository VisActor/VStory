import type { ComponentOptions } from '@visactor/vrender-components';
import { AbstractComponent } from '@visactor/vrender-components';
import type { ITextComponentAttributes } from '../interface/character-text';
import { merge } from '@visactor/vutils';
import type { GraphicType, IRichText } from '@visactor/vrender-core';
import { COMPONENT_NUMBER_TYPE } from './GroupComponent/component-group-graphic';

export class BaseComponent extends AbstractComponent<ITextComponentAttributes> {
  type: GraphicType = 'vstory-component-group' as any;
  numberType: number = COMPONENT_NUMBER_TYPE;

  static defaultAttributes: Partial<ITextComponentAttributes> = {
    visible: true,
    textStyle: {
      fontSize: 12,
      fill: '#000',
      textAlign: 'left',
      textBaseline: 'top'
    },
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  };

  constructor(attributes: ITextComponentAttributes, options?: ComponentOptions) {
    super(options?.skipDefault ? attributes : merge({}, BaseComponent.defaultAttributes, attributes));
  }

  protected render(): void {
    // text在group中进行布局，如果给定了宽高的话
    // 如果没有给定宽高的话，就按照文本的宽高进行布局，同时要加上padding
    const { textStyle, padding, width, height } = this.attribute as ITextComponentAttributes;

    const { textAlign, textBaseline } = textStyle;

    const richtextTextAlign = textAlign === 'start' ? 'left' : textAlign === 'end' ? 'right' : textAlign;
    const richtextBaseline = textBaseline === 'alphabetic' ? 'middle' : textBaseline;
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
    textConfig = this.transformTextAttrsToRichTextConfig(textStyle, richtextTextAlign);
    richtext.setAttributes({
      textConfig,
      verticalDirection: richtextBaseline,
      width: boxWidth,
      height: boxHeight,
      x: padding.left,
      y: padding.top
    });

    this.attribute.width = boxWidth;
    this.attribute.height = boxHeight;
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
