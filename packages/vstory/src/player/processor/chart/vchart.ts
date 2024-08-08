import type { IComponent, ISeries, IVChart } from '@visactor/vchart';
import { isFunction, isNumberClose, merge } from '@visactor/vutils';
import type { ICharacter } from '../../../story/character';
import type { IAction } from '../../../story/interface';
import { ActionProcessorItem } from '../processor-item';
import { transformMap } from './transformMap';
import type { IChartAppearAction, IChartDisAppearAction } from '../interface/appear-action';
import type { AxisBaseAttributes } from '@visactor/vrender-components';
import type { IGroup } from '@visactor/vrender-core';

export class VChartVisibilityActionProcessor extends ActionProcessorItem {
  name: 'appearOrDisAppear';

  constructor() {
    super();
  }

  getStartTimeAndDuration(action: IAction): { startTime: number; duration: number } {
    const { startTime: globalStartTime = 0, duration: globalDuration } = action;
    const { startTime = 0, duration = 0 } = action.payload?.animation ?? ({} as any);

    const st = globalStartTime + startTime;
    const d = globalDuration ?? duration;
    return {
      startTime: st,
      duration: d
    };
  }

  run(character: ICharacter, actionSpec: IChartAppearAction | IChartDisAppearAction): void {
    if (actionSpec.payload?.animation?.effect === 'fade') {
      const appearTransformFunc = (transformMap.appear as any).chart;
      const defaultPayload = VChartVisibilityActionProcessor.defaultPayload;
      this.runTransformFunc(character.graphic as IGroup, appearTransformFunc, actionSpec, defaultPayload);
      return;
    }

    const vchart = (character.graphic as any)._vchart as IVChart;
    // series & mark
    const seriesList = vchart.getChart().getAllSeries();
    seriesList.forEach(series => {
      this.commonSeriesAppear(vchart, series, actionSpec);
    });
    // component
    const components = vchart.getChart().getAllComponents();
    components.forEach(component => {
      this.componentAppear(vchart, component, actionSpec);
    });
  }

  protected componentAppear(vchart: IVChart, component: IComponent, actionSpec: IAction) {
    if (component.specKey === 'label') {
      this.labelComponentAppear(vchart, component, actionSpec);
    } else if (component.specKey === 'legends') {
      this.legendsComponentAppear(vchart, component, actionSpec);
    } else if (component.specKey === 'axes') {
      this.axisComponentAppear(vchart, component, actionSpec);
    } else if (component.specKey === 'title') {
      this.titleComponentAppear(vchart, component, actionSpec);
    }
  }

  protected labelComponentAppear(vchart: IVChart, component: IComponent, actionSpec: IAction) {
    const vrenderComponents = component.getVRenderComponents();
    const appearTransformFunc = (transformMap.appear as any).label;
    const defaultPayload = VChartVisibilityActionProcessor.defaultPayload;
    vrenderComponents.forEach(group => {
      this.runTransformFunc(group as any, appearTransformFunc, actionSpec, defaultPayload);
    });
  }

  protected legendsComponentAppear(vchart: IVChart, component: IComponent, actionSpec: IAction) {
    const vrenderComponents = component.getVRenderComponents();
    const appearTransformFunc = (transformMap.appear as any).legends;
    const defaultPayload = VChartVisibilityActionProcessor.fadePayload;
    vrenderComponents.forEach(group => {
      this.runTransformFunc(group as any, appearTransformFunc, actionSpec, defaultPayload);
    });
  }

  protected axisComponentAppear(vchart: IVChart, component: IComponent, actionSpec: IAction) {
    const vrenderComponents = component.getVRenderComponents();
    const axis = vrenderComponents[0];
    const axisGrid = vrenderComponents[1];
    const axisOrient = (axis.attribute as AxisBaseAttributes).orient;
    const axisItems = (axis.attribute as AxisBaseAttributes).items ?? [[]];
    const orient = axisOrient === 'left' || axisOrient === 'right' ? 'height' : 'width';
    const gridOrient = axisOrient === 'left' || axisOrient === 'right' ? 'width' : 'height';
    const direction = isNumberClose(axisItems[0][0].value, 1) ? 'positive' : 'negative';
    const appearTransformFunc = (transformMap.appear as any).axis;
    const defaultPayload = (VChartVisibilityActionProcessor as any).defaultPayload;

    if (axis) {
      this.runTransformFunc(axis as any, appearTransformFunc, actionSpec, defaultPayload, { orient, direction });
    }
    if (axisGrid) {
      this.runTransformFunc(axisGrid as any, appearTransformFunc, actionSpec, defaultPayload, {
        orient: gridOrient,
        direction
      });
    }
  }

  protected titleComponentAppear(vchart: IVChart, component: IComponent, actionSpec: IAction) {
    const vrenderComponents = component.getVRenderComponents();
    const appearTransformFunc = (transformMap.appear as any).title;
    const defaultPayload = VChartVisibilityActionProcessor.fadePayload;
    vrenderComponents.forEach(group => {
      this.runTransformFunc(group as any, appearTransformFunc, actionSpec, defaultPayload);
    });
  }

  private runTransformFunc(
    instance: IGroup,
    appearTransformFunc: any,
    actionSpec: IAction,
    defaultPayload: IAction['payload'] = {},
    actionOption: Record<string, any> = {}
  ) {
    if (instance && appearTransformFunc) {
      const { payload } = actionSpec;
      const mergePayload = merge({}, defaultPayload, payload) as IChartAppearAction['payload'];
      appearTransformFunc(instance, mergePayload.animation, {
        disappear: actionSpec.action === 'disappear',
        ...actionOption
      });
    }
  }

  protected commonSeriesAppear(vchart: IVChart, series: ISeries, actionSpec: IAction) {
    const marks = series.getMarksWithoutRoot();
    if (!marks.length) {
      return;
    }
    const { payload } = actionSpec;
    marks.forEach((mark, markIndex) => {
      const defaultMarkPayload = (VChartVisibilityActionProcessor as any)[`${mark.type}Payload`];
      const mergePayload = merge(
        {},
        isFunction(defaultMarkPayload) ? defaultMarkPayload(series.type) : defaultMarkPayload || {},
        payload
      ) as IChartAppearAction['payload'];
      const product = mark.getProduct();
      const appearTransform = (transformMap.appear as any)[mark.type];
      const config =
        appearTransform &&
        appearTransform(vchart as any, mergePayload.animation, {
          index: markIndex,
          disappear: actionSpec.action === 'disappear'
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

  static defaultPayload: IChartAppearAction['payload'] = {
    animation: {
      effect: 'grow',
      duration: 2000,
      easing: 'cubicOut',
      oneByOne: false,
      loop: false
    }
  };

  static fadePayload: IChartAppearAction['payload'] = {
    animation: {
      effect: 'fade',
      duration: 2000,
      easing: 'cubicOut',
      oneByOne: false,
      loop: false
    }
  };

  static arcPayload: IChartAppearAction['payload'] = {
    animation: {
      effect: 'growAngle',
      duration: 2000,
      easing: 'cubicOut',
      oneByOne: false,
      loop: false
    }
  };

  static linePayload: IChartAppearAction['payload'] = VChartVisibilityActionProcessor.defaultPayload;
  static symbolPayload: IChartAppearAction['payload'] = VChartVisibilityActionProcessor.defaultPayload;
  static textPayload: IChartAppearAction['payload'] = VChartVisibilityActionProcessor.defaultPayload;
}
