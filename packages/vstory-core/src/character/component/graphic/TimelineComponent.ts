import type { ComponentOptions } from '@visactor/vrender-components';
import { Timeline } from '@visactor/vrender-components';
import { merge } from '@visactor/vutils';
import type { ITimelineComponentAttributes } from '../interface/character-timeline';
import { BaseComponentWithText } from './BaseComponentWithText';

export class TimelineComponent extends BaseComponentWithText {
  static defaultAttributes: Partial<ITimelineComponentAttributes> = {
    visible: true,
    textStyle: {},
    width: 100,
    height: 100,
    clip: true,
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  };

  timeline: Timeline;

  constructor(attributes: ITimelineComponentAttributes, options?: ComponentOptions) {
    super(options?.skipDefault ? attributes : merge({}, TimelineComponent.defaultAttributes, attributes));
  }

  protected render(): void {
    super.render();
    // 添加image
    this.renderTimeline();
  }
  protected renderTimeline() {
    const { graphic, padding, width, height } = this.attribute as ITimelineComponentAttributes;
    const attrs: any = { ...graphic, scaleX: 1, scaleY: 1, angle: 0, postMatrix: null };
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
    if (!this.timeline) {
      this.timeline = new Timeline(attrs);
      this.add(this.timeline);
    } else {
      this.timeline.setAttributes(attrs);
    }
  }
}
