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
import type { IChartCharacterRuntime } from './interface/runtime';
import type { IUpdateConfigParams } from '../common/interface';
import { ChartConfigProcess } from './chart-config-process';
import type { ICharacterChart } from './interface/character-chart';
import { mergeChartOption } from '../../utils/chart';
import type { IComponent, ISeries, IVChart } from '@visactor/vchart';
import { isArray } from '@visactor/vutils';

export class CharacterChart<T extends IChartGraphicAttribute>
  extends CharacterBase<IChartGraphicAttribute>
  implements ICharacterChart
{
  static type = 'Chart';
  visActorType: 'chart' | 'component' | 'table' | 'common' = 'chart';
  protected declare _graphic: VChartGraphic;
  protected declare _config: IChartCharacterConfig;

  // 临时记录 vchart 对象。在第一次执行 afterInitializeChart 后赋值， 在 beforeVRenderDraw 中使用
  // 不临时记录的话，第一次 beforeVRenderDraw 时，graphic 对象还未执行完初始化，当前对象的 _graphic 为 null
  protected _vchart: IVChart;

  protected _ticker: ITicker;
  protected _timeline: ITimeline;
  protected _runtime: IChartCharacterRuntime[] = [];

  static RuntimeMap: { [key: string]: boolean } = {};

  constructor(config: ICharacterConfig, option: ICharacterInitOption) {
    super(config, option);
    this._timeline = new DefaultTimeline();
    this._ticker = new ManualTicker([this._timeline]);
    this.configProcess = new ChartConfigProcess(this);
  }

  get config() {
    return this._config;
  }

  protected _initRuntime() {
    super._initRuntime();
  }

  tickTo(t: number): void {
    const stage = this._graphic.vchart.getStage();
    stage.ticker.start();
    stage.getTimeline().resume();
    stage.ticker.tickAt && stage.ticker.tickAt(t);
  }

  getGraphicBySelector(selector: string | string[]) {
    let chart = false;
    let panel = false;
    const seriesList: Set<ISeries> = new Set();
    const componentsList: Set<IComponent> = new Set();
    if (isArray(selector)) {
      selector.forEach(s => {
        const data = this._getGraphicBySelector(s);
        chart = chart || data.chart;
        panel = panel || data.panel;
        data.seriesList.forEach(s => seriesList.add(s));
        data.componentsList.forEach(c => componentsList.add(c));
      });
      return {
        chart,
        panel,
        seriesList: Array.from(seriesList.values()),
        componentsList: Array.from(componentsList.values())
      };
    }
    return this._getGraphicBySelector(selector);
  }

  _getGraphicBySelector(selector: string) {
    const vchart = this._graphic.vchart;
    let chart = false;
    let seriesList = vchart.getChart().getAllSeries();
    let componentsList = vchart.getChart().getAllComponents();
    const selectorList = selector.split(' ');
    // 是否包含panel, >0为包含
    let includePanel = 1;
    selectorList.forEach(subSelector => {
      if (subSelector === '*') {
        chart = true;
      } else if (/:not\(([^)]+)\)/.test(subSelector)) {
        const match = /:not\(([^)]+)\)/.exec(subSelector)[1];
        const data = this.selectByNameOrType(seriesList, componentsList, match, false);
        seriesList = data.seriesList;
        componentsList = data.componentsList;
        if (match === 'panel') {
          includePanel = -Infinity; // 如果被排除，那么一定不包含了
        }
      } else {
        const data = this.selectByNameOrType(seriesList, componentsList, subSelector);
        seriesList = data.seriesList;
        componentsList = data.componentsList;
        if (subSelector === 'panel') {
          includePanel = Infinity; // 如果有正选，那么选中才算
        } else {
          includePanel--;
        }
      }
    });

    return {
      chart,
      panel: includePanel > 0,
      seriesList,
      componentsList
    };
  }

  protected selectByNameOrType(
    seriesList: ISeries[],
    componentsList: IComponent[],
    select: string,
    match: boolean = true
  ) {
    if (select[0] === '#') {
      return this.selectByNameOrUserId(seriesList, componentsList, select, match);
    }
    return this.selectByType(seriesList, componentsList, select, match);
  }

  protected selectByNameOrUserId(
    seriesList: ISeries[],
    componentsList: IComponent[],
    select: string,
    match: boolean = true
  ) {
    const name = select.substring(1);
    return {
      seriesList: seriesList.filter(item => (item.name === name || item.userId === name) === match),
      componentsList: componentsList.filter(item => (item.name === name || item.userId === name) === match)
    };
  }

  protected selectByType(seriesList: ISeries[], componentsList: IComponent[], name: string, match: boolean = true) {
    return {
      seriesList: seriesList.filter(item => (item.type === name || item.specKey === name) === match),
      componentsList: componentsList.filter(item => (item.type === name || item.specKey === name) === match)
    };
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

  protected _clearRuntime(): void {
    this._runtime.length = 0;
  }

  protected getViewBoxFromSpec() {
    const layout = getLayoutFromWidget(this._config.position, this);
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
    this._runtime.forEach(r => r.applyConfigToAttribute?.(this));
    // 设置locked
    this.locked = !!config.locked;
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
      zIndex: this._config.zIndex ?? 0,
      vchartBoundsMode: this._config.options.initOption?.vchartBoundsMode ?? 'clip',
      chartInitOptions: mergeChartOption(
        {
          performanceHook: {
            afterInitializeChart: (vchart: IVChart) => {
              this._vchart = vchart;
              this._runtime.forEach(r => r.afterInitialize?.(this, vchart));
            },
            // @ts-ignore
            beforeDoRender: () => {
              this._runtime.forEach(r => r.beforeVRenderDraw?.(this, this._graphic?.vchart ?? this._vchart));
            }
          }
        },
        this._config.options.initOption ?? {}
      )
    };
  }

  protected _clearGraphic(): void {
    super._clearGraphic();
    this._vchart = null;
  }

  getRuntimeConfig() {
    return this;
  }
}
