import type { IComponent, ISeries, IVChart } from '@visactor/vchart';
import { array, cloneDeep, isArray, isFunction, isNumberClose, merge } from '@visactor/vutils';
import type { ICharacter } from '../../../story/character';
import type { IActionSpec } from '../../../story/interface';
import { ActionProcessorItem } from '../processor-item';
import { transformMap } from './transformMap';
import type { IChartVisibilityAction, IChartVisibilityPayload } from '../interface/appear-action';
import type { AxisBaseAttributes } from '@visactor/vrender-components';
import type { IGraphic, IGroup } from '@visactor/vrender-core';
import type { IAction, IActionPayload } from '../interface/common-action';
import { checkArrayOrder, isMatch } from '../component/utils';

export type Datum = Record<string, any>;

class VChartBaseActionProcessor extends ActionProcessorItem {
  /**
   * 筛选器，payload中可以配置筛选器来设置这个
   * @param selector
   * @param vchart
   */
  selectBySelector(selector: string, vchart: IVChart) {
    let chart = false;
    let seriesList = vchart.getChart().getAllSeries();
    let componentsList = vchart.getChart().getAllComponents();
    const selectorList = selector.split(' ');
    selectorList.forEach(subSelector => {
      if (subSelector === '*') {
        chart = true;
      } else if (/:not\(([^)]+)\)/.test(subSelector)) {
        const match = /:not\(([^)]+)\)/.exec(subSelector)[1];
        const data = this.selectByNameOrType(seriesList, componentsList, match, false);
        seriesList = data.seriesList;
        componentsList = data.componentsList;
      } else {
        const data = this.selectByNameOrType(seriesList, componentsList, subSelector);
        seriesList = data.seriesList;
        componentsList = data.componentsList;
      }
    });

    return {
      chart,
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
    if (select === '#') {
      return this.selectByName(seriesList, componentsList, select, match);
    }
    return this.selectByType(seriesList, componentsList, select, match);
  }

  protected selectByName(seriesList: ISeries[], componentsList: IComponent[], select: string, match: boolean = true) {
    const name = select.substring(1);
    return {
      seriesList: seriesList.filter(item => (item.name === name) === match),
      componentsList: componentsList.filter(item => (item.name === name) === match)
    };
  }

  protected selectByType(seriesList: ISeries[], componentsList: IComponent[], name: string, match: boolean = true) {
    return {
      seriesList: seriesList.filter(item => (item.type === name || item.specKey === name) === match),
      componentsList: componentsList.filter(item => (item.type === name || item.specKey === name) === match)
    };
  }

  getStartTimeAndDuration(action: IActionSpec): { startTime: number; duration: number } {
    const { startTime: globalStartTime = 0 } = action;
    let totalStartTime = Infinity;
    let totalEndTime = -Infinity;
    array(action.payload).forEach(payload => {
      const { startTime = 0, duration = 0 } = payload?.animation ?? ({} as any);
      totalStartTime = Math.min(startTime ?? 0, totalStartTime);
      totalEndTime = Math.max(startTime + duration, totalEndTime);
    });

    let st = globalStartTime + totalStartTime;
    let d = totalEndTime - totalStartTime;
    // 避免数据不合法，算出来时长有问题
    if (!isFinite(st)) {
      st = 0;
    }
    if (!isFinite(d)) {
      d = 0;
    }
    return {
      startTime: st,
      duration: d
    };
  }
}

export class VChartVisibilityActionProcessor extends VChartBaseActionProcessor {
  name: 'appearOrDisAppear';

  constructor() {
    super();
  }

  run(character: ICharacter, actionSpec: IChartVisibilityAction): void {
    const vchart = (character.graphic as any)._vchart as IVChart;
    // 基于选择器做筛选
    // 同一个Action的payload数组中，项与项之间是覆盖关系，后项覆盖前项
    const runnedSeriesSet = new Set();
    const runnedComponentsSet = new Set();
    let runnedChart = false;
    array(actionSpec.payload)
      .reverse()
      .forEach(payload => {
        const { chart, seriesList, componentsList } = this.selectBySelector(payload.selector ?? '*', vchart);
        if (!runnedChart && chart) {
          // chart & panel
          this.chartVisibility(character.graphic as any, actionSpec.action, payload);
        }
        // 过滤seriesList
        const shouldRunSeriesList = seriesList.filter(item => !runnedSeriesSet.has(item));
        shouldRunSeriesList.forEach(series => {
          this.commonSeriesAppear(vchart, series, actionSpec.action, payload);
        });
        // 过滤componentsList
        const shouldRunComponentsList = componentsList.filter(item => !runnedComponentsSet.has(item));
        shouldRunComponentsList.forEach(component => {
          this.componentAppear(vchart, component, actionSpec.action, payload);
        });
        runnedChart = runnedChart || chart;
        seriesList.forEach(item => runnedSeriesSet.add(item));
        componentsList.forEach(item => runnedComponentsSet.add(item));
      });

    // // series & mark
    // const seriesList = vchart.getChart().getAllSeries();

    // component
    // const components = vchart.getChart().getAllComponents();
    // components.forEach(component => {
    //   this.componentAppear(vchart, component, actionSpec);
    // });
  }

  protected chartVisibility(chartGraphic: IGraphic, action: 'appear' | 'disappear', payload: IChartVisibilityPayload) {
    const appearTransformFunc = (transformMap.appear as any).chart;
    const defaultPayload = VChartVisibilityActionProcessor.fadePayload;
    this.runTransformFunc(chartGraphic as any, appearTransformFunc, action, payload, defaultPayload);
  }

  protected componentAppear(
    vchart: IVChart,
    component: IComponent,
    action: 'appear' | 'disappear',
    payload: IChartVisibilityPayload
  ) {
    if (component.specKey === 'label') {
      this.labelComponentAppear(vchart, component, action, payload);
    } else if (component.specKey === 'legends') {
      this.legendsComponentAppear(vchart, component, action, payload);
    } else if (component.specKey === 'axes') {
      this.axisComponentAppear(vchart, component, action, payload);
    } else if (component.specKey === 'title') {
      this.titleComponentAppear(vchart, component, action, payload);
    }
  }

  protected labelComponentAppear(
    vchart: IVChart,
    component: IComponent,
    action: 'appear' | 'disappear',
    payload: IChartVisibilityPayload
  ) {
    const vrenderComponents = component.getVRenderComponents();
    const appearTransformFunc = (transformMap.appear as any).label;
    const defaultPayload = VChartVisibilityActionProcessor.defaultPayload;
    vrenderComponents.forEach(group => {
      this.runTransformFunc(group as any, appearTransformFunc, action, payload, defaultPayload);
    });
  }

  protected legendsComponentAppear(
    vchart: IVChart,
    component: IComponent,
    action: 'appear' | 'disappear',
    payload: IChartVisibilityPayload
  ) {
    const vrenderComponents = component.getVRenderComponents();
    const appearTransformFunc = (transformMap.appear as any).legends;
    const defaultPayload = VChartVisibilityActionProcessor.fadePayload;
    vrenderComponents.forEach(group => {
      this.runTransformFunc(group as any, appearTransformFunc, action, payload, defaultPayload);
    });
  }

  protected axisComponentAppear(
    vchart: IVChart,
    component: IComponent,
    action: 'appear' | 'disappear',
    payload: IChartVisibilityPayload
  ) {
    const vrenderComponents = component.getVRenderComponents();
    const axis = vrenderComponents[0];
    if (!axis) {
      return;
    }
    const axisGrid = vrenderComponents[1];
    const axisOrient = (axis.attribute as AxisBaseAttributes)?.orient;
    if (axisOrient === 'angle' || axisOrient === 'radius') {
      this.polarAxisAppear(axis, axisGrid, action, payload);
    } else {
      this.cartesianAxisAppear(axis, axisGrid, action, payload);
    }
  }

  protected cartesianAxisAppear(
    axis: any,
    axisGrid: any,
    action: 'appear' | 'disappear',
    payload: IChartVisibilityPayload
  ) {
    const axisOrient = (axis.attribute as AxisBaseAttributes)?.orient;
    const axisItems = (axis.attribute as AxisBaseAttributes)?.items ?? [[]];
    const orient = axisOrient === 'left' || axisOrient === 'right' ? 'height' : 'width';
    const gridOrient = axisOrient === 'left' || axisOrient === 'right' ? 'width' : 'height';
    // 有点 hack。从 vrender component 拿不到轴 inverse 配置。
    const direction = checkArrayOrder(axisItems[0], 'value') < 0 ? 'positive' : 'negative';
    const appearTransformFunc = (transformMap.appear as any).axis;
    const defaultPayload = VChartVisibilityActionProcessor.defaultPayload;
    if (axis) {
      this.runTransformFunc(axis as any, appearTransformFunc, action, payload, defaultPayload, { orient, direction });
    }
    if (axisGrid) {
      this.runTransformFunc(axisGrid as any, appearTransformFunc, action, payload, defaultPayload, {
        orient: gridOrient,
        direction
      });
    }
  }

  protected polarAxisAppear(
    axis: any,
    axisGrid: any,
    action: 'appear' | 'disappear',
    payload: IChartVisibilityPayload
  ) {
    const axisItems = (axis.attribute as AxisBaseAttributes)?.items ?? [[]];
    const appearTransformFunc = (transformMap.appear as any).axis;
    const defaultPayload = VChartVisibilityActionProcessor.fadePayload;
    if (axis) {
      this.runTransformFunc(axis as any, appearTransformFunc, action, payload, defaultPayload);
    }
    if (axisGrid) {
      this.runTransformFunc(axisGrid as any, appearTransformFunc, action, payload, defaultPayload, {});
    }
  }

  protected titleComponentAppear(
    vchart: IVChart,
    component: IComponent,
    action: 'appear' | 'disappear',
    payload: IChartVisibilityPayload
  ) {
    const vrenderComponents = component.getVRenderComponents();
    const appearTransformFunc = (transformMap.appear as any).title;
    const defaultPayload = VChartVisibilityActionProcessor.fadePayload;
    vrenderComponents.forEach(group => {
      this.runTransformFunc(group as any, appearTransformFunc, action, payload, defaultPayload);
    });
  }

  private runTransformFunc(
    instance: IGroup,
    appearTransformFunc: any,
    action: 'appear' | 'disappear',
    payload: IChartVisibilityPayload,
    defaultPayload: IActionSpec['payload'] = {} as any,
    actionOption: Record<string, any> = {}
  ) {
    if (instance && appearTransformFunc) {
      const mergePayload = merge({}, defaultPayload, payload) as IChartVisibilityPayload;
      appearTransformFunc(instance, mergePayload.animation, {
        disappear: action === 'disappear',
        ...actionOption
      });
    }
  }

  protected commonSeriesAppear(
    vchart: IVChart,
    series: ISeries,
    action: 'appear' | 'disappear',
    payload: IChartVisibilityPayload
  ) {
    const marks = series.getMarksWithoutRoot();
    if (!marks.length) {
      return;
    }
    marks.forEach((mark, markIndex) => {
      const defaultMarkPayload = (VChartVisibilityActionProcessor as any)[`${mark.type}Payload`];
      const mergePayload = merge(
        {},
        isFunction(defaultMarkPayload) ? defaultMarkPayload(series.type) : defaultMarkPayload || {},
        payload
      ) as IChartVisibilityPayload;
      const product = mark.getProduct();
      const appearTransform = (transformMap.appear as any)[mark.type];
      const config =
        appearTransform &&
        appearTransform(vchart as any, mergePayload.animation, {
          index: markIndex,
          disappear: action === 'disappear'
        });
      // @ts-ignore
      product && product.animate.run(config || {});
    });
  }

  static rectPayload = (seriesType: string) => {
    return {
      animation: {
        effect: seriesType === 'treemap' ? 'centerGrow' : 'grow',
        duration: 2000,
        easing: 'cubicOut',
        oneByOne: false,
        loop: false
      }
    };
  };

  static defaultPayload: IChartVisibilityAction['payload'] = {
    animation: {
      effect: 'grow',
      duration: 2000,
      easing: 'cubicOut',
      oneByOne: false,
      loop: false
    }
  };

  static fadePayload: IChartVisibilityAction['payload'] = {
    animation: {
      effect: 'fade',
      duration: 2000,
      easing: 'cubicOut',
      oneByOne: false,
      loop: false
    }
  };

  static arcPayload: IChartVisibilityAction['payload'] = {
    animation: {
      effect: 'growAngle',
      duration: 2000,
      easing: 'cubicOut',
      oneByOne: false,
      loop: false
    }
  };

  static linePayload: IChartVisibilityAction['payload'] = VChartVisibilityActionProcessor.defaultPayload;
  static symbolPayload: IChartVisibilityAction['payload'] = VChartVisibilityActionProcessor.defaultPayload;
  static textPayload: IChartVisibilityAction['payload'] = VChartVisibilityActionProcessor.defaultPayload;
}

export interface IChartUpdatePayload extends IActionPayload {
  // 批量更新数据
  values: Array<Datum>;

  // 将sourceValue替换为targetValue
  data: Array<{
    sourceValue: Datum;
    targetValue: Datum;
  }>;

  id: string | number;
}

export interface IChartUpdateAction extends IAction<IChartUpdatePayload> {
  action: 'update';
}

export class VChartUpdateActionProcessor extends VChartBaseActionProcessor {
  name: 'update';

  constructor() {
    super();
  }

  run(character: ICharacter, actionSpec: IChartUpdateAction): void {
    const instance = (character.graphic as any)._vchart as IVChart;
    if (!instance) {
      return;
    }

    const { payload } = actionSpec;
    // update action暂时不支持数组
    const { id: dataId, data, values } = payload as IChartUpdatePayload;

    if (values) {
      instance.updateDataSync(dataId, values);
    } else {
      const rowData = cloneDeep((instance as any)._dataSet.getDataView(dataId).rawData);

      const items = isArray(data) ? data : [data];

      items.forEach(item => {
        const { sourceValue, targetValue } = item;
        const dataIndex = rowData.findIndex((v: any) => isMatch(v, sourceValue));
        if (dataIndex !== -1) {
          rowData.splice(dataIndex, 1, targetValue);
        }
      });

      instance.updateDataSync(dataId, rowData);
    }
  }
}

export interface IChartAddPayload extends IActionPayload {
  id: string | number;
  values: Datum | Datum[];
  style?: {
    [key: string]: number | string;
  };
}

export interface IChartAddAction extends IAction<IChartAddPayload> {
  action: 'add';
}

export class VChartAddActionProcessor extends VChartBaseActionProcessor {
  name: 'add';

  constructor() {
    super();
  }

  run(character: ICharacter, actionSpec: IChartAddAction): void {
    const instance = (character.graphic as any)._vchart as IVChart;
    if (!instance) {
      return;
    }

    const { payload } = actionSpec as IChartAddAction;
    // add action暂时不支持数组
    const { id: dataId, values } = payload as IChartAddPayload;
    const rowData = cloneDeep((instance as any)._dataSet.getDataView(dataId).rawData);

    const data = isArray(values) ? values : [values];
    rowData.push(...data);

    instance.updateDataSync(dataId, rowData);
  }
}
