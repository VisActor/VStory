import { array, merge } from '@visactor/vutils';
import type { IActionSpec, ICharacter } from '@visactor/vstory-core';
import { globalProcessorRegistry, CharacterType } from '@visactor/vstory-core';
import { VTableBaseActionProcessor } from './base';
import type { ITableVisibilityAction, ITableVisibilityPayload } from './interface';
import { transformMap } from './transformFunc/transformMap';
import type { IGroup } from '@visactor/vrender-core';
import { ACTION_TYPE } from '../constants/action';
import { CommonBounceActionProcessor } from '../component/common/bounce';
import { CommonStyleActionProcessor } from '../component/common/style';

export class VTableVisibilityActionProcessor extends VTableBaseActionProcessor {
  name: 'appearOrDisAppear';
  protected character: ICharacter | null;

  constructor() {
    super();
  }

  run(character: ICharacter, actionSpec: ITableVisibilityAction): void {
    super.preRun(character, actionSpec);
    this.character = character;
    // 基于选择器做筛选
    // 同一个Action的payload数组中，项与项之间是覆盖关系，后项覆盖前项
    const runnedTable = false;
    array(actionSpec.payload)
      .reverse()
      .forEach(payload => {
        const { table, panel } = this.selectBySelector(payload.selector ?? '*', character);
        if (!runnedTable && table) {
          // table & panel
          this.tableVisibility(character.graphic as any, actionSpec.action, payload);
        } else if (!runnedTable && panel) {
          // panel
          this.panelVisibility(character.graphic as any, actionSpec.action, payload);
        }
      });
    this.character = null;
  }

  protected tableVisibility(tableGraphic: any, action: 'appear' | 'disappear', payload: ITableVisibilityPayload) {
    const appearTransformFunc = transformMap.appear.table;
    const defaultPayload = VTableVisibilityActionProcessor.fadePayload;
    this.runTransformFunc(tableGraphic as any, appearTransformFunc, action, payload, defaultPayload);
  }

  protected panelVisibility(tableGraphic: any, action: 'appear' | 'disappear', payload: ITableVisibilityPayload) {
    const appearTransformFunc = transformMap.appear.panel;
    const defaultPayload = VTableVisibilityActionProcessor.fadePayload;
    this.runTransformFunc(tableGraphic as any, appearTransformFunc, action, payload, defaultPayload);
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
        ...actionOption,
        payload: mergePayload
      });
    }
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

  static defaultPayload: ITableVisibilityAction['payload'] = {
    animation: {
      effect: 'grow',
      duration: 2000,
      easing: 'cubicOut',
      oneByOne: false,
      loop: false
    }
  };

  static fadePayload: ITableVisibilityAction['payload'] = {
    animation: {
      effect: 'fade',
      duration: 2000,
      easing: 'cubicOut',
      oneByOne: false,
      loop: false
    }
  };

  static arcPayload: ITableVisibilityAction['payload'] = {
    animation: {
      effect: 'growAngle',
      duration: 2000,
      easing: 'cubicOut',
      oneByOne: false,
      loop: false
    }
  };

  static linePayload: ITableVisibilityAction['payload'] = VTableVisibilityActionProcessor.defaultPayload;
  static symbolPayload: ITableVisibilityAction['payload'] = VTableVisibilityActionProcessor.defaultPayload;
  static textPayload: ITableVisibilityAction['payload'] = VTableVisibilityActionProcessor.defaultPayload;
}

export function registerVTableVisibilityAction() {
  globalProcessorRegistry.registerProcessor(CharacterType.VTABLE, {
    [ACTION_TYPE.APPEAR]: new VTableVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new VTableVisibilityActionProcessor(),
    [ACTION_TYPE.BOUNCE]: new CommonBounceActionProcessor(),
    [ACTION_TYPE.STYLE]: new CommonStyleActionProcessor()
  });
}
