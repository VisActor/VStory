import { AbstractComponent, type ComponentOptions } from '@visactor/vrender-components';
import { merge } from '@visactor/vutils';
import { BaseComponentWithText } from '@visactor/vstory-core';
import type { ISinglePieComponentAttributes, ISinglePieGraphicAttribute } from './single-pie-interface';
import type { IArc } from '@visactor/vrender-core';

class VRenderSinglePieComponent extends AbstractComponent<ISinglePieGraphicAttribute> {
  protected render(): void {
    const { trackPie, pie, width, height } = this.attribute as ISinglePieGraphicAttribute;
    const radius = Math.max(Math.min(width, height), 0);
    const trackArc = this.createOrUpdateChild(
      'trackPie',
      {
        startAngle: 0,
        endAngle: Math.PI * 2,
        x: width / 2,
        y: height / 2,
        outerRadius: radius,
        innerRadius: 0,
        ...trackPie
      },
      'arc'
    ) as IArc;
    const arc = this.createOrUpdateChild(
      'pie',
      {
        startAngle: 0,
        endAngle: Math.PI * 2,
        x: width / 2,
        y: height / 2,
        outerRadius: radius,
        innerRadius: 0,
        ...pie
      },
      'arc'
    ) as IArc;
  }
}

export class SinglePieComponent extends BaseComponentWithText {
  static defaultAttributes: Partial<ISinglePieComponentAttributes> = {
    visible: true,
    textStyle: {},
    width: 100,
    height: 100,
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  };

  vrComponent: VRenderSinglePieComponent;

  constructor(attributes: ISinglePieComponentAttributes, options?: ComponentOptions) {
    super(options?.skipDefault ? attributes : merge({}, SinglePieComponent.defaultAttributes, attributes));
  }

  protected render(): void {
    super.render();
    // 添加pie
    this.renderPie();
  }
  protected renderPie() {
    const { graphic, padding, width, height } = this.attribute as ISinglePieComponentAttributes;
    const attrs = { ...graphic };
    if (!attrs.x) {
      attrs.x = padding.left;
    }
    if (!attrs.y) {
      attrs.y = padding.top;
    }
    if (!attrs.width) {
      attrs.width = width - padding.left - padding.right;
    }
    if (!attrs.height) {
      attrs.height = height - padding.top - padding.bottom;
    }
    if (!this.vrComponent) {
      const lottie = new VRenderSinglePieComponent({});
      this.vrComponent = lottie;
      this.addChild(lottie);
    }
    this.vrComponent.setAttributes({ ...attrs, scaleX: 1, scaleY: 1, angle: 0, postMatrix: null });
  }
}
