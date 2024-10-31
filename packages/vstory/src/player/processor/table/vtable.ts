import type { IGraphic, IGroup } from '@visactor/vrender-core';
import { transformMap } from '../chart/transformMap';
import type {
  IChartVisibilityAction,
  ITableVisibilityAction,
  ITableVisibilityPayload
} from '../interface/appear-action';
import type { IActionSpec } from '../../../story/interface';
import { array, merge } from '@visactor/vutils';
import type { ICharacter } from '../../../story/character';
import { ActionProcessorItem } from '../processor-item';

export class VTableVisibilityActionProcessor extends ActionProcessorItem {
  name: 'appearOrDisAppear';

  static fadePayload: ITableVisibilityAction['payload'] = {
    animation: {
      effect: 'fade',
      duration: 2000,
      easing: 'cubicOut'
    }
  };

  protected tableVisibility(chartGraphic: IGraphic, action: 'appear' | 'disappear', payload: ITableVisibilityPayload) {
    const appearTransformFunc = (transformMap.appear as any).chart;
    const defaultPayload = VTableVisibilityActionProcessor.fadePayload;
    this.runTransformFunc(chartGraphic as any, appearTransformFunc, action, payload, defaultPayload);
  }

  private runTransformFunc(
    instance: IGroup,
    appearTransformFunc: any,
    action: 'appear' | 'disappear',
    payload: ITableVisibilityPayload,
    defaultPayload: IActionSpec['payload'] = {} as any,
    actionOption: Record<string, any> = {}
  ) {
    if (instance && appearTransformFunc) {
      const mergePayload = merge({}, defaultPayload, payload) as ITableVisibilityPayload;
      appearTransformFunc(instance, mergePayload.animation, {
        disappear: action === 'disappear',
        ...actionOption
      });
    }
  }

  run(character: ICharacter, actionSpec: IChartVisibilityAction): void {
    // const vchart = (character.graphic.graphic as any)._vtable as any;
    // // 基于选择器做筛选
    // // 同一个Action的payload数组中，项与项之间是覆盖关系，后项覆盖前项
    // const runnedSeriesSet = new Set();
    // const runnedComponentsSet = new Set();
    // let runnedChart = false;
    array(actionSpec.payload)
      .reverse()
      .forEach(payload => {
        this.tableVisibility(character.graphic.graphic as any, actionSpec.action, payload);
      });
  }
}
