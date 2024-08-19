import { getLayoutFromWidget } from '../../../utils/layout';
import type { IWidgetData } from '../../dsl-interface';
import type { IRichText, IRichTextGraphicAttribute, TextAlignType, TextBaselineType } from '@visactor/vrender';
import { createRichText, createText } from '@visactor/vrender';
import type { CharacterComponent } from '../character';

export const MAX_LAYOUT_SIZE = 999999;

export class GraphicBaseText {
  private _character: CharacterComponent;
  private _graphic: IRichText;
  get graphic() {
    return this._graphic;
  }
  constructor(graphicCharacter: CharacterComponent) {
    this._character = graphicCharacter;
  }

  getInitialAttributes(): IRichTextGraphicAttribute & { graphicAlign: string; graphicBaseline: string } {
    return {
      visible: true,
      x: 0,
      y: 0,
      textAlign: 'center',
      textBaseline: 'middle',
      textConfig: [],
      fontSize: 16,
      // fill: '#000000',
      // whiteSpace: 'normal',
      graphicAlign: 'center',
      graphicBaseline: 'middle',
      // // compute real height without vrender buffer
      ignoreBuf: true,
      maxLineWidth: MAX_LAYOUT_SIZE,
      heightLimit: MAX_LAYOUT_SIZE
    };
  }

  show(): void {
    this._graphic.setAttributes({
      visible: true
      // visibleAll: true,
    });
  }
  hide(): void {
    this._graphic.setAttributes({
      visible: false
      // visibleAll: false,
    });
  }

  transformTextAttrsToRichTextConfig() {
    const textAttr = (this._character.spec.options?.text ?? {}) as IRichTextGraphicAttribute;
    let textConfig = textAttr.textConfig;

    // 如果是纯文本定义方式
    if (!(textConfig && textConfig.length) && textAttr.text) {
      const textList = Array.isArray(textAttr.text) ? textAttr.text : [textAttr.text];
      textConfig = textList.map((item, i) => {
        return {
          textAlign: 'center',
          textBaseline: 'middle',
          // ...((textAttr || {}) as any),
          text: item + (i < textList.length - 1 ? '\n' : '')
        };
      });
    }

    return textConfig;
  }

  init() {
    this._graphic = createRichText(
      this._transformTextAttributes({
        ...this.getInitialAttributes(),
        textConfig: this.transformTextAttrsToRichTextConfig()
      } as any)
    );
    this._character.getGraphicParent().add(this._graphic);
  }

  applyGraphicAttribute(graphicAttribute: Partial<IRichTextGraphicAttribute>): void {
    this._graphic.setAttributes({ ...graphicAttribute });
  }

  getGraphicAttribute(): IRichTextGraphicAttribute {
    return this._graphic?.attribute;
  }

  updateAttribute = (attribute: Partial<IRichTextGraphicAttribute>): void => {
    if (attribute) {
      this._graphic.setAttributes(this._transformTextAttributes(attribute));
      this._updateGraphicCharacterSize();
    }
  };

  applyLayoutData(w: Partial<IWidgetData>): void {
    const layoutData = getLayoutFromWidget(w);
    const layoutRatio = this._character.getTextLayoutRatio();
    const graphicAlign = (this._graphic.attribute as any).graphicAlign;
    const graphicBaseline = (this._graphic.attribute as any).graphicBaseline;
    const left = layoutData.width * layoutRatio.left;
    const right = layoutData.width * layoutRatio.right;
    const center = (left + right) / 2;
    const top = layoutData.height * layoutRatio.top;
    const bottom = layoutData.height * layoutRatio.bottom;
    const middle = (top + bottom) / 2;
    let x = center;
    let align: TextAlignType = 'center';
    let y = middle;
    let baseline: TextBaselineType = 'middle';
    switch (graphicAlign) {
      case 'left':
        x = left;
        align = 'left';
        break;
      case 'center':
        x = center;
        align = 'center';
        break;
      case 'right':
        x = right;
        align = 'right';
        break;
    }
    switch (graphicBaseline) {
      case 'top':
        y = top;
        baseline = 'top';
        break;
      case 'middle':
        y = middle;
        baseline = 'middle';
        break;
      case 'bottom':
        y = bottom;
        baseline = 'bottom';
        break;
    }

    this._graphic.setAttributes(
      this._transformTextAttributes({
        x,
        y,
        textAlign: 'left',
        textBaseline: 'top',
        angle: layoutData.angle,
        anchor: [layoutData.width / 2, layoutData.height / 2],
        scaleCenter: [layoutData.width / 2, layoutData.height / 2],
        maxWidth: layoutData.width,
        maxHeight: layoutData.height,
        heightLimit: this._character.graphic.getGraphicAttribute().isResized ? bottom - top : MAX_LAYOUT_SIZE
      })
    );
  }

  private _updateGraphicCharacterSize() {
    if (!this._character.graphic.getGraphicAttribute().isResized) {
      // const layoutRatio = this._character.graphic.getTextLayoutRatio();
      // const textHeight = this._graphic.AABBBounds.height();
      // const minGraphicHeight = this._character.graphic.getInitialAttributes().height;
      // const graphicHeight = Math.max(textHeight / (layoutRatio.bottom - layoutRatio.top), minGraphicHeight);
      // this._character.graphic.applyLayoutData({
      //   height: graphicHeight
      // });
      this.applyLayoutData(this._character.graphic.getPositionData());
    }
  }

  private _transformTextAttributes(attributes: IRichTextGraphicAttribute): IRichTextGraphicAttribute {
    return attributes;
  }
}
