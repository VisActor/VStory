import type { ITicker, ITimeline } from '@visactor/vrender-core';
import { DefaultTimeline, ManualTicker } from '@visactor/vrender-core';
import type { ICharacterPickInfo, IStoryEvent } from '../../interface/event';
import { CharacterBase } from '../character-base';
import type { IChartGraphicAttribute } from './graphic/vchart-graphic';
import { VChartGraphic } from './graphic/vchart-graphic';
import { getChartModelWithEvent } from './utils/vchart-pick';
import type { ICharacterConfig, ICharacterInitOption } from '../../interface/dsl/dsl';
import type { IChartCharacterConfig } from '../../interface/dsl/chart';
import { getLayoutFromWidget } from '../../utils/layout';
import type {
  IChartCharacterRuntime,
  IChartCharacterRuntimeConstructor,
  IUpdateConfigParams
} from './interface/runtime';
import { CommonSpecRuntime } from './runtime/common-spec';
import { CommonLayoutRuntime } from './runtime/common-layout';
import { ChartConfigProcess } from './chart-config-process';
import type { ICharacterChart } from './interface/character-chart';
import { mergeChartOption } from '../../utils/chart';
import type { IVChart } from '@visactor/vchart';

export class CharacterChart<T extends IChartGraphicAttribute>
  extends CharacterBase<IChartGraphicAttribute>
  implements ICharacterChart
{
  visActorType: 'chart' | 'component' | 'table' | 'common' = 'chart';
  protected declare _graphic: VChartGraphic;
  protected declare _config: IChartCharacterConfig;

  protected _ticker: ITicker;
  protected _timeline: ITimeline;
  protected _runtime: IChartCharacterRuntime[] = [];

  static RunTime: IChartCharacterRuntimeConstructor[] = [CommonSpecRuntime, CommonLayoutRuntime];

  constructor(config: ICharacterConfig, option: ICharacterInitOption) {
    super(config, option);
    this._timeline = new DefaultTimeline();
    this._ticker = new ManualTicker([this._timeline]);
    this.configProcess = new ChartConfigProcess(this);
  }

  get config() {
    return this._config;
  }

  tickTo(t: number): void {
    this._graphic.vchart.getStage().ticker.tickAt(t);
  }

  checkEvent(event: IStoryEvent): false | ICharacterPickInfo {
    if (!(event.detailPath ?? event.path).some(g => g === this._graphic)) {
      return false;
    }
    const chartPath = event.detailPath[event.detailPath.length - 1];
    const result = getChartModelWithEvent(this._graphic.vchart, event);
    if (!result) {
      // 点击到图表的空白区域
      if (this._graphic.pointInViewBox((event as any).canvasX, (event as any).canvasY)) {
        return {
          part: 'null',
          graphic: null,
          modelInfo: null,
          graphicType: 'null'
        };
      }
      return false;
    }
    const graphic = chartPath?.[chartPath.length - 1];
    return {
      part: result.type,
      modelInfo: result,
      graphic,
      graphicType: graphic.type
    };
  }

  _initGraphic() {
    this.applyConfigToAttribute(this._config, this._config);
    const attribute = this.getAttribute();

    this._graphic = new VChartGraphic(attribute);

    this.canvas.addGraphic(this._graphic);
  }

  protected _initRuntime(): void {
    CharacterChart.RunTime.forEach(R => {
      this._runtime.push(new R(this));
    });
  }
  protected _clearRuntime(): void {
    this._runtime.length = 0;
  }

  protected getViewBoxFromSpec() {
    const layout = getLayoutFromWidget(this._config.position);
    const viewBox = {
      x1: layout.x,
      x2: layout.x + layout.width,
      y1: layout.y,
      y2: layout.y + layout.height
    };
    return { layout, viewBox };
  }

  protected applyConfigToAttribute(diffConfig: IUpdateConfigParams, config: IUpdateConfigParams): void {
    this._attribute = this.getDefaultAttribute() as any;
    this._runtime.forEach(r => r.applyConfigToAttribute?.());
  }

  getDefaultAttribute(): Partial<IChartGraphicAttribute> {
    return {
      spec: this._config.options.spec,
      vchart: null,
      dpr: this._canvas.getDpr(),
      disableTriggerEvent: true,
      disableDirtyBounds: true,
      autoRender: false,
      width: 500,
      height: 500,
      mode: 'desktop-browser',
      interactive: false,
      panel: {},
      ticker: this._ticker,
      chartInitOptions: mergeChartOption(
        {
          performanceHook: {
            afterInitializeChart: (vchart: IVChart) => {
              // (<IChartTemp>this.configProcess.dataTempTransform?.specTemp)?.afterInitialize({ character: this });
              this._runtime.forEach(r => r.afterInitialize?.(vchart));
            },

            afterVRenderDraw: () => {
              this._runtime.forEach(r => r.afterVRenderDraw?.());
            }
          }
        },
        this._config.options.initOption ?? {}
      )
    };
  }
}
