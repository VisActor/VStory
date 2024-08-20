import { CommonSpecRuntime } from './runtime/common-spec';
import { ComponentSpecRuntime } from './runtime/component-spec';
import type { IChartCharacterRuntimeConstructor } from './runtime/interface';
import { cloneDeep, isValid } from '@visactor/vutils';
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

  setAttributes(attr: Record<string, any>): void {
    // this.group.setAttributes(attr);
    this._graphic.setAttributes(attr);
    // this._text.updateAttribute({});
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
    if (!(event.detailPath ?? event.path).some(g => g === this._graphic)) {
      return false;
    }
    // 超出vchart viewBox 外的图表元素，依然会绘制并且能被选中
    // if (!this._graphic.pointInVChart((event as any).canvasX, (event as any).canvasY)) {
    //   return false;
    // }
    const chartPath = event.detailPath[event.detailPath.length - 1];
    const result = getChartModelWithEvent(this._graphic.vProduct, event);
    if (!result) {
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
