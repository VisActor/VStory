import { Timeline } from '@visactor/vrender-components';
import { createText } from '@visactor/vrender';
import type { IPointLike } from '@visactor/vutils';
import { Graphic } from './graphic';
import type { IWidgetData } from '../../dsl-interface';
import { getLayoutFromWidget } from '../../../utils/layout';

export class GraphicTimeline extends Graphic {
  protected _graphic: Timeline;

  getInitialAttributes() {
    return {
      x: 0,
      y: 0,
      clipRange: 0
    };
  }

  init() {
    if (!this._graphic) {
      this._graphic = new Timeline(
        this._transformAttributes({
          ...this.getInitialAttributes(),
          ...(this._character.spec.options?.graphic ?? {})
        })
      );
      this._graphic.name = `timeline-${this._character.id}`;
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
        height
      })
    );
  }
}
