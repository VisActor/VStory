import { CommonSpecRuntime } from './runtime/common-spec';
import { ComponentSpecRuntime } from './runtime/component-spec';
import type { IChartCharacterRuntimeConstructor } from './runtime/interface';
import { cloneDeep, merge } from '@visactor/vutils';
import { VChart } from '@visactor/vchart';
import type { IChartCharacterSpec } from '../dsl-interface';
import { Chart } from './graphic/vchart-graphic';
import { CharacterVisactor } from '../visactor/character';
import { SpecProcess } from './spec-process/spec-process';
import { ChartDataTempTransform } from './spec-process/data-temp-transform';
import type { ITicker } from '@visactor/vrender';
import type { IChartTemp } from './temp/interface';
import { SeriesSpecRuntime } from './runtime/series-spec';
import type { StoryEvent } from '../../interface/runtime-interface';
import type { ICharacterPickInfo } from '../runtime-interface';
import { getLayoutFromWidget } from '../../utils/layout';
import { getChartModelWithEvent } from '../../utils/vchart-pick';

export class CharacterChart extends CharacterVisactor {
  static type = 'CharacterChart';
  static RunTime: IChartCharacterRuntimeConstructor[] = [
    ComponentSpecRuntime as unknown as IChartCharacterRuntimeConstructor,
    CommonSpecRuntime as unknown as IChartCharacterRuntimeConstructor,
    SeriesSpecRuntime as unknown as IChartCharacterRuntimeConstructor
  ];

  readonly visActorType = 'chart';

  protected declare _specProcess: SpecProcess;
  protected _ticker: ITicker;

  declare _graphic: Chart;

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
    const { spec, viewBox } = this._getChartOption();
    // @ts-ignore
    this._graphic = new Chart({
      renderCanvas: this._option.canvas.getCanvas(),
      spec,
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
      chartInitOptions: merge(
        {
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
        },
        this._spec.options.initOption ?? {}
      )
    });
    this.hide();
    this.option.graphicParent.add(this._graphic as any);
  }

  setAttributes(attr: Record<string, any>): void {
    // character 的属性
    if (attr.position) {
      this._spec.position = attr.position;
      // 位置属性
      this._graphic.updateViewBox(this.getViewBoxFromSpec().viewBox);
    }
  }
  getViewBoxFromSpec() {
    const layout = getLayoutFromWidget(this._spec.position);
    const viewBox = {
      x1: layout.x,
      x2: layout.x + layout.width,
      y1: layout.y,
      y2: layout.y + layout.height
    };
    return { layout, viewBox };
  }

  private _getChartOption() {
    const { layout, viewBox } = this.getViewBoxFromSpec();
    const spec = cloneDeep(this._specProcess.getVisSpec() ?? this._spec.options.spec);
    spec.width = layout.width;
    spec.height = layout.height;
    return {
      viewBox,
      spec
    };
  }

  protected _afterRender(): void {
    // console.log('afterRender');
    return;
  }
  protected _updateVisactorSpec(): void {
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
    if (!(event.detailPath ?? event.path).some(g => g === this._graphic)) {
      return false;
    }
    const chartPath = event.detailPath[event.detailPath.length - 1];
    const result = getChartModelWithEvent(this._graphic.vProduct, event);
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

  release(): void {
    this.option.graphicParent.removeChild(this._graphic as any);
    this._graphic.release && this._graphic.release();
  }

  private _reflow() {
    if (!this._graphic) {
      this._initGraphics();
      return;
    }
    const { spec } = this._getChartOption();
    this._graphic.updateSpec(spec);
  }
}
