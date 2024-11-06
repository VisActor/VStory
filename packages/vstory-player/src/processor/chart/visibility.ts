import type { IComponent, ISeries, IVChart } from '@visactor/vchart';
import { array, cloneDeep, isArray, isFunction, merge } from '@visactor/vutils';
import type { IActionSpec, ICharacter } from '@visactor/vstory-core';
import { globalProcessorRegistry, CharacterType } from '@visactor/vstory-core';
import { VChartBaseActionProcessor } from './base';
import type { IChartVisibilityAction, IChartVisibilityPayload } from './interface';
import { transformMap } from './transformFunc/transformMap';
import type { AxisBaseAttributes } from '@visactor/vrender-components';
import { checkArrayOrder } from '../../utils/checkArrayOrder';
import type { IGroup } from '@visactor/vrender-core';
import { ACTION_TYPE } from '../constants/action';

export class VChartVisibilityActionProcessor extends VChartBaseActionProcessor {
  name: 'appearOrDisAppear';

  constructor() {
    super();
  }

  run(character: ICharacter, actionSpec: IChartVisibilityAction): void {
    const vchart = character.graphic._vchart as IVChart;
    // 基于选择器做筛选
    // 同一个Action的payload数组中，项与项之间是覆盖关系，后项覆盖前项
    const runnedSeriesSet = new Set();
    const runnedComponentsSet = new Set();
    let runnedChart = false;
    array(actionSpec.payload)
      .reverse()
      .forEach(payload => {
        const { chart, seriesList, componentsList, panel } = this.selectBySelector(payload.selector ?? '*', vchart);
        if (!runnedChart && chart) {
          // chart & panel
          this.chartVisibility(character.graphic as any, actionSpec.action, payload);
        } else if (!runnedChart && panel) {
          // panel
          this.panelVisibility(character.graphic as any, actionSpec.action, payload);
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
  }

  protected chartVisibility(chartGraphic: any, action: 'appear' | 'disappear', payload: IChartVisibilityPayload) {
    const appearTransformFunc = transformMap.appear.chart;
    const defaultPayload = VChartVisibilityActionProcessor.fadePayload;
    this.runTransformFunc(chartGraphic as any, appearTransformFunc, action, payload, defaultPayload);
  }

  protected panelVisibility(chartGraphic: any, action: 'appear' | 'disappear', payload: IChartVisibilityPayload) {
    const appearTransformFunc = transformMap.appear.panel;
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
    const appearTransformFunc = transformMap.appear.label;
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
    const appearTransformFunc = transformMap.appear.legends;
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
    const appearTransformFunc = transformMap.appear.axis;
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
    const appearTransformFunc = transformMap.appear.axis;
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
    const appearTransformFunc = transformMap.appear.title;
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
        ...actionOption,
        payload: mergePayload
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
          disappear: action === 'disappear',
          payload: mergePayload
        });
      // @ts-ignore
      product && product.animate && product.animate.run(config || {});
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

export function registerVChartVisibilityAction() {
  globalProcessorRegistry.registerProcessor(CharacterType.VCHART, {
    [ACTION_TYPE.APPEAR]: new VChartVisibilityActionProcessor()
  });
}
