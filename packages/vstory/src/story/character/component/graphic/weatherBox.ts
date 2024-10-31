import { getGlobalTimeline } from '../../../../animate/global';
import { Graphic } from './graphic';
import { WeatherBox } from '@visactor/vrender-components';

export class GraphicWeatherBox extends Graphic {
  protected _graphic: WeatherBox;

  getInitialAttributes() {
    return {
      x: 0,
      y: 0,
      width: 120,
      height: 80,
      angle: 0,
      anchor: [60, 40],
      rainRatio: 0,
      snowRatio: 1,
      snowSpeed: 0.1,
      snowSizeRange: [10, 26],
      windRatio: 0.2,
      rainCountThreshold: 0,
      snowCountThreshold: 20
    };
  }

  init() {
    if (!this._graphic) {
      this._graphic = new WeatherBox(
        this._transformAttributes({
          ...this.getInitialAttributes(),
          ...(this._character.config.options?.graphic ?? {})
        }),
        {
          timeline: getGlobalTimeline()
        }
      );
      this._graphic.name = `graphic-weatherBox-${this._character.id}`;
      this._character.getGraphicParent().add(this._graphic);
    }
  }
}
