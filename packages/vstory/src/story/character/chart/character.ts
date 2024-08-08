import { CommonSpecRuntime } from './runtime/common-spec';
import { ComponentSpecRuntime } from './runtime/component-spec';
import type { IChartCharacterRuntimeConstructor } from './runtime/interface';
import { cloneDeep } from '@visactor/vutils';
import { VChart } from '@visactor/vchart';
import type { IChartCharacterSpec } from '../dsl-interface';
import { Chart } from './graphic/vchart-graphic';
import { getLayoutFromWidget } from '../../utils/layout';
import { CharacterVisactor } from '../visactor/character';
import { SpecProcess } from './spec-process/spec-process';
import { ChartDataTempTransform } from './spec-process/data-temp-transform';
import type { ITicker } from '@visactor/vrender';
import type { IChartTemp } from './temp/interface';
import { SeriesSpecRuntime } from './runtime/series-spec';
import type { StoryEvent } from '../../interface/runtime-interface';
import type { ICharacterPickInfo } from '../runtime-interface';

export class CharacterChart extends CharacterVisactor {
  static type = 'CharacterChart';
  static RunTime: IChartCharacterRuntimeConstructor[] = [
    ComponentSpecRuntime as unknown as IChartCharacterRuntimeConstructor,
    CommonSpecRuntime as unknown as IChartCharacterRuntimeConstructor,
    SeriesSpecRuntime as unknown as IChartCharacterRuntimeConstructor
  ];

  protected declare _specProcess: SpecProcess;
  protected _ticker: ITicker;

  protected declare _spec: IChartCharacterSpec;
  get spec() {
    return this._spec;
  }

  protected _initSpecProcess(): void {
    this._specProcess = new SpecProcess(this as any, ChartDataTempTransform, this.onSpecReady);
  }

  protected _initRuntime(): void {
    CharacterChart.RunTime.forEach(R => {
      this._runtime.push(new R(this));
    });
  }

  protected _parserSpec(): void {
    this._specProcess.updateConfig(this._spec);
  }
  protected _initGraphics(): void {
    // this._ticker = new ManualTicker([]);
    const layout = getLayoutFromWidget(this._spec.position);
    const viewBox = {
      x1: layout.x,
      x2: layout.x + layout.width,
      y1: layout.y,
      y2: layout.y + layout.height
    };
    const spec = cloneDeep(this._specProcess.getVisSpec());
    spec.width = layout.width;
    spec.height = layout.height;
    // @ts-ignore
    this._graphic = new Chart({
      renderCanvas: this._option.canvas.getCanvas(),
      spec: spec,
      ClassType: VChart,
      vchart: null,
      zIndex: this._spec.zIndex,
      mode: 'desktop-browser',
      dpr: window.devicePixelRatio,
      interactive: false,
      autoRender: false,
      disableDirtyBounds: true,
      viewBox,
      ticker: this._option.canvas.getStage().ticker,
      visibleAll: false,
      ...(this._spec.options.panel ?? {}),
      chartInitOptions: {
        animation: true,
        disableTriggerEvent: true,
        performanceHook: {
          afterInitializeChart: () => {
            (<IChartTemp>this.specProcess.dataTempTransform?.specTemp)?.afterInitializeChart({ character: this });
            this._runtime.forEach(r => r.afterInitializeChart?.());
          },
          afterVRenderDraw: () => {
            this._runtime.forEach(r => r.afterVRenderDraw?.());
          }
        }
      }
    });
    this.option.graphicParent.add(this._graphic as any);
  }

  protected _afterRender(): void {
    // console.log('afterRender');
    return;
  }
  protected _updateVisactorSpec(): void {
    // console.log('_updateVisactorSpec', this._specProcess.getVisSpec());
    this._graphic?.updateSpec(this._specProcess.getVisSpec());
  }

  clearCharacter(): void {
    this._graphic.vProduct.release();
    this._graphic.parent.removeChild(this._graphic);
  }

  tickTo(t: number): void {
    this._ticker.tickAt(t);
  }

  checkEvent(event: StoryEvent): false | ICharacterPickInfo {
    return false;
  }

  release(): void {
    this.option.graphicParent.removeChild(this._graphic as any);
  }
}
